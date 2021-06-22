import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [
    { data: [23.77, 5.36, 4.34, 1.41, 1.035], label: 'Enfermedades más comunes en méxico 2019 (en miles)' }
  ];

  public chartLabels: Array<any> = ['Respiratorias', 'Intestinales', 'Vías Urinarias', 'Ulceras, Gastritis', 'Conjuntivitis'];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  public usr='';
  constructor(private logService: LoginService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    try{
      this.logService.sendSesion().subscribe((response: any)=>{
        console.log ('Respuesta en inicio: '+response);
        this.usr=response.usuario;
        console.log(JSON.stringify(response.rl));
        if(response.rl){
          console.log(response.rl);
          window.location.reload();
          response.rl=false;
          
          this.logService.reloadSes('{"rl":"false"}').subscribe((response2: any)=>{
            console.log(JSON.stringify(response2));
          });
        }
        console.log('Respuesta en inicio: '+JSON.stringify(response));
       
      });
    }catch(e ){
      console.log(e);
    }
    console.log('Hola bienvenido a Confirmacion de cuenta');
    this.route.queryParams.subscribe(params => {
      if (this.route.snapshot.queryParams.id) {
        console.log('id: ', this.route.snapshot.queryParams.id);
        let JSON1;
        JSON1={
    
          IDconfirmada:this.route.snapshot.queryParams.id
    
       }
        this.logService.Confirmar(JSON1).subscribe((response: any)=>{
         console.log(response);
         
        });
  }
    });
   
    
  }


  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    this.router.navigate([currentUrl]);
    console.log(currentUrl);
    });
    }

}
