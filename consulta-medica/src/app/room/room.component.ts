import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Socket } from "ngx-socket-io";
import Peer from 'peerjs';
import { LoginService } from '../login.service';
import { Router } from "@angular/router";
import { RoomService } from 'src/app/room.service';
import { saveAs } from 'file-saver';

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

  historiaMedica: Array<Consulta>=new Array<Consulta>();
  documentos: Array<Documento>=new Array<Documento>();
  nombrePaciente: string='';
  fechaPaciente: Date=new Date();
  telefono: string='';


  constructor(private route: ActivatedRoute,private socket: Socket,private logService: LoginService, private router: Router, private roomService: RoomService) { }

  ngOnInit(): void {
    this.logService.sendSesion().subscribe((response: any)=>{
      console.log(JSON.stringify(response));
      this.currentUserId=response.idu;
      console.log('El id usuario desde room'+this.currentUserId);
      console.log('tipo es '+response.tipo);
      if(response.tipo=!'undefined'){
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
      setTimeout(()=>{
        if(!this.paciente){
          console.log('El usuario que esta no es paciente');
          this.generarDatosPaciente();
        } else {
          console.log('El usuario es paciente');
        }
      },500);
      

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

  generarDatosPaciente(){
    let JSON1={
      idConsulta:this.idConsulta
    };
    let idPaciente='0';
    this.roomService.historia(JSON1).subscribe((response:any)=>{
      for (const iterator of response) {
        this.historiaMedica.push(new Consulta(iterator.id_paciente, iterator.enfermedad, iterator.descripcion,iterator.peso, iterator.talla, iterator.temperatura, iterator.presion_arterial, iterator.pulso_cardiaco, new Date(iterator.fecha)));
        idPaciente=iterator.id_paciente;
      }
    });
    setTimeout(()=>{
      let JSON2={
        idPaciente:idPaciente,
      }
      this.roomService.datosPersonales(JSON2).subscribe((response:any)=>{
        console.log(response);
        this.nombrePaciente=response.nombre;
        this.fechaPaciente=new Date(response.fecha_nacimiento);
        this.telefono=response.telefono;
      });
      this.roomService.laboratorio(JSON2).subscribe((response:any)=>{
        for (const iterator of response) {
          this.documentos.push(new Documento(iterator.tipo_de_analisis, new Date(iterator.fecha), iterator.documento));
        }
      });
    },500);
  }

  descargar(documento:any){
    let JSON1={
      documento:documento
    };
    this.roomService.descarga(JSON1).subscribe(data=>{
      alert('Su descarga iniciara pronto');
      console.log(data);
      let downloadURL=window.URL.createObjectURL(data);
      saveAs(downloadURL);
      
    });
  }
}

class Consulta {
  idPaciente:number;
  enfermedad:string;
  descripcion:string;
  peso:number;
  talla:number;
  temperatura:number;
  presion:number;
  pulso:number;
  fecha:Date;
  constructor(idPaciente: number, enfermedad:string, descripcion:string ,peso: number, talla: number, temperatura: number, presion: number, pulso: number, fecha: Date) {
    this.idPaciente=idPaciente;
    this.enfermedad=enfermedad;
    this.descripcion=descripcion;
    this.peso=peso;
    this.talla=talla;
    this.temperatura=temperatura;
    this.presion=presion;
    this.pulso=pulso;
    this.fecha=fecha;
  }
}

class Documento {
  tipo: string;
  fecha: Date;
  documento: string;
  constructor(tipo: string, fecha: Date, documento: string){
    this.tipo=tipo;
    this.fecha=fecha;
    this.documento=documento;
  }
}