import{Injectable} from '@angular/core'
import{HttpClient,HttpClientModule,HttpHeaders} from '@angular/common/http'
import{Observable} from 'rxjs'
import { Computer } from '../Models/computer';
@Injectable()
export class ComputadoraService{

    public url='http://localhost:8080/api/productos/'

    constructor(private _http:HttpClient){
    }

    testService(){
        return 'probando el servicio de Angular'
    }

      saveProducto(computer:Computer):Observable<any>{
        // Convertir el objeto Project a una cadena JSON
        let params=JSON.stringify(computer);
        let headers=new HttpHeaders().set('Content-Type','application/json');
    
        return this._http.post(this.url+'add',params,{headers:headers});
    }

    getProduc(): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'all', {headers: headers});
	}

}