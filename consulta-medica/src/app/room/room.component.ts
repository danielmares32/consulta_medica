import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Socket } from "ngx-socket-io";
import Peer from 'peerjs';
import { LoginService } from '../login.service';
import { Router } from "@angular/router";

//declare const Peer=new Peer();

interface VideoElement {
  muted: boolean;
  srcObject: MediaStream;
  userId: string;
}

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  currentUserId:string = '0';
  idConsulta:string = '0';
  videos: VideoElement[] = [];
  paciente: boolean=false;
  constructor(private route: ActivatedRoute,private socket: Socket,private logService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.logService.sendSesion().subscribe((response: any)=>{
      console.log(JSON.stringify(response));
      this.currentUserId=response.idu;
      console.log('El id usuario desde room'+this.currentUserId);
      if(response.tipo=!null){
        this.paciente=true;
      }
    });
    setTimeout(()=>{
      console.log(`Initialize Peer with id ${this.currentUserId}`);
      const myPeer = new Peer(this.currentUserId, {
        host: '/',
        port: 3001
      });

      this.route.params.subscribe((params) => {
        console.log('Por aca el roomid'+JSON.stringify(params));
        this.idConsulta=params.idConsulta;
        myPeer.on('open', (userId:any) => {
          this.socket.emit('join-room', params.idConsulta, userId);
        });
      });

      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      })
        .catch((err) => {
          console.error('[Error] Not able to retrieve user media:', err);
          return new MediaStream();
        })
        .then((stream: MediaStream) => {
          if (stream) {
            this.addMyVideo(stream);
          }

          myPeer.on('call', (call:any) => {
            console.log('receiving call...', call);
            call.answer(stream);

            call.on('stream', (otherUserVideoStream: MediaStream) => {
              console.log('receiving other stream', otherUserVideoStream);

              this.addOtherUserVideo(call.metadata.userId, otherUserVideoStream);
            });

            call.on('error', (err:any) => {
              console.error(err);
            })
          });

          this.socket.on('user-connected', (userId:any) => {
            console.log('Receiving user-connected event', `Calling ${userId}`);

            // Let some time for new peers to be able to answer
            setTimeout(() => {
              const call = myPeer.call(userId, stream, {
                metadata: { userId: this.currentUserId },
              });
              call.on('stream', (otherUserVideoStream: MediaStream) => {
                console.log('receiving other user stream after his connection');
                this.addOtherUserVideo(userId, otherUserVideoStream);
              });

              call.on('close', () => {
                this.videos = this.videos.filter((video) => video.userId !== userId);
              });
            }, 1000);
          });
        });

      this.socket.on('user-disconnected', (userId:any) => {
        console.log(`receiving user-disconnected event from ${userId}`)
        this.videos = this.videos.filter(video => video.userId !== userId);
      });
    },1000);
    
  }

  addMyVideo(stream: MediaStream) {
    this.videos.push({
      muted: true,
      srcObject: stream,
      userId: this.currentUserId,
    });
  }

  addOtherUserVideo(userId: string, stream: MediaStream) {
    const alreadyExisting = this.videos.some(video => video.userId === userId);
    if (alreadyExisting) {
      console.log(this.videos, userId);
      return;
    }
    this.videos.push({
      muted: false,
      srcObject: stream,
      userId,
    });
  }

  onLoadedMetadata(event: Event) {
    (event.target as HTMLVideoElement).play();
  }

  irExpediente(){
    if(this.paciente)
      this.router.navigate(['inicio']);
    else
      this.router.navigate([`actualizarExpediente/${this.idConsulta}`]);
  }

}
