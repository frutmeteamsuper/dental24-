import { Component, OnInit } from '@angular/core';
import { UserWService } from "../../services/user-w.service";
import { TixInterface } from '../../models/tix-interface';
import { DataApiService } from '../../services/data-api.service';
import { ScrollTopService }  from '../../services/scroll-top.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testapp',
  templateUrl: './testapp.component.html',
  styleUrls: ['./testapp.component.css']
})
export class TestappComponent implements OnInit {

  constructor(
  public scrollTopService:ScrollTopService,
   public _uw:UserWService,
  private dataApi: DataApiService,
     public router: Router,
    private location: Location
     ) { }
   loadAPI = null;  

  url = "assets/assetsdental/js/jquery.min.js";
  url1 = "assets/assetsdental/js/popper.min.js";
  url2= "assets/assetsdental/js/slick.js";
  url3 = "assets/assetsdental/plugins/swiper/js/swiper.min.js";
  url4 = "assets/assetsdental/js/script.js";

 public loadScript() {
    let node = document.createElement("script");
    node.src = this.url;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  }

  public loadScript1() {
    let node = document.createElement("script");
    node.src = this.url1;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  }   
  public loadScript2() {
    let node = document.createElement("script");
    node.src = this.url2;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  } 
   public loadScript3() {
    let node = document.createElement("script");
    node.src = this.url3;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  } 
   public loadScript4() {
    let node = document.createElement("script");
    node.src = this.url4;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  }
     public tixs:TixInterface;
  getAllTixsInitload(){
    this.dataApi
    .getAllTixsInitload()
    .subscribe((tixs: TixInterface) => (this.tixs=tixs));
  }

  getAllTixs(){
    this.dataApi
    .getAllTixs()
    .subscribe((tixs: TixInterface) => (this.tixs=tixs));
  }

   getTamano(){
    this.dataApi
    .getTamano()
    .subscribe((res:any) => {
      if (res[0] === undefined){
        return
        }else{
         this._uw.totalTixs = res.length;
        }
      });
  }
  getTamanoIni(){
    this.dataApi
    .getTamanoIni()
    .subscribe((res:any) => {
      if (res[0] === undefined){
        return
        }else{
         this._uw.totalTixs = res.length;
        }
      });
  }
loadmore(){
  this.getAllTixs();
  this.getTamano();
     this.scrollTopService.setScrollTop();
  this._uw.allLoaded=true;
  this._uw.showAll=true;
}
showAll(){
  this._uw.showAll=true;
}
oncart(index){
   let id=index;
  this.tixs[id].oncart=true;
  // console.log("en el carrito");
}
outcart(index){

    let id=index;
    this.tixs[id].quantity=0;
   this.tixs[id].oncart=false;
  this.cartCalculate();
     // console.log("fuera del carrito");
}

minus(index){
  
   let id=index;
   if(this.tixs[id].quantity>0){      
   this.tixs[id].quantity=this.tixs[id].quantity-1;
   this.cartCalculate();
  }
  if(this.tixs[id].quantity==0){
    this.tixs[id].oncart=false;
    this.outcart(id);
  }
}
plus(index){
  let id=index;
  this.tixs[id].quantity=this.tixs[id].quantity+1;
  this.oncart(id);
  if(this.tixs[id].quantity>0){
    this.cartCalculate();
  }
}
cartCalculate(){
  this._uw.car =[];
  this._uw.numProd=0;
  this._uw.total=0;
  // console.log("tama??o: "+this._uw.totalTixs)
  for (let i = 0; i < this._uw.totalTixs; i++){
    if (this.tixs[i].quantity>0){
      this._uw.car.push(this.tixs[i]);
      this._uw.numProd=this._uw.numProd+1;
      this._uw.total=this._uw.total+(this.tixs[i].quantity*this.tixs[i].globalPrice);
    }
  }
}

  ngOnInit() {
     // this.getAllTixsInitload();
     // this.getTamanoIni();
     // this.loadmore();
     this._uw.categorySelected="hortalizas";
 if (this._uw.loaded==true){
      this.loadAPI = new Promise(resolve => {
        this.loadScript();
        this.loadScript1();
        this.loadScript2();
        this.loadScript3();
        this.loadScript4();
        // this.loadScript3();
        });
      }
    this._uw.loaded=true;
  }


}
