import { Injectable } from '@angular/core';
import { Http,Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class UsersProvider {

  url = 'http://45.55.67.183';

  constructor(private http: Http) {
    
  }

  loadUsers(idUser:number){
    let url = this.url+"/api/reporte/";
    return this.http.get(url);
  }

  generateWithoutElement(sede,propietario){
    let url = this.url+"/api/reporte/";
    let body = `idSede=${sede}&idPropietario=${propietario}`;
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post(url,body,{headers:headers});
  }

  generateWithElement(sede,propietario,elemento){
    let url = this.url+"/api/reporte/";
    let body = `idSede=${sede}&idElemento=${elemento}&idPropietario=${propietario}`;
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post(url,body,{headers:headers});
}

}
