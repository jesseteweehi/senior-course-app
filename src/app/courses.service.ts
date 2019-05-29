import { Injectable, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

constructor(
  @Inject(AngularFirestore) protected afs: AngularFirestore,
) {}


  readdoc$(path: string, id: string): Observable<any> {
    console.log(path, id);
    return this.afs.doc<any>(`${path}/${id}`).valueChanges();
  }

  readcollection$(path: string, id: string): Observable<any[]> {
    return this.afs.collection<any>(`${path}/${id}`).valueChanges().pipe(
      tap(r => {
        if (!environment.production) {
          console.groupCollapsed(`Firestore Streaming [${path}] [readcollection$] ${id}`);
          console.log(r);
          console.groupEnd();
        }
      })
    );
  }

  create(ref: AngularFirestoreCollection<any>, path: string, value: any) {
    const id = this.afs.createId();
    return ref.doc(id).set(Object.assign({}, { id }, value)).then(_ => {
        if (!environment.production) {
            console.groupCollapsed(`Firestore Service [${path}] [create]`);
            console.log('[Id]', id, value);
            console.groupEnd();
        }
    });
  }

}
