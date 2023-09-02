import{Injectable} from '@angular/core'
import{HttpClient,HttpClientModule,HttpHeaders} from '@angular/common/http'
import{Observable} from 'rxjs'
import{Project}from '../Models/project';
import { global } from './global';
@Injectable()
export class ProjectService{

    public url:string;

    constructor(private _http:HttpClient){
      this.url=global.url;
    }

    testService(){
        return 'probando el servicio de Angular'
    }
    saveProject(project:Project):Observable<any>{
        // Convertir el objeto Project a una cadena JSON
        let params=JSON.stringify(project);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        
        return this._http.post(this.url+'save-project',params,{headers:headers});
    }
}