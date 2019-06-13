import { Injectable, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

constructor(
  @Inject(AngularFirestore) protected afs: AngularFirestore,
) {}

  readdoc$(path: string, id: string): Observable<any> {
    return this.afs.doc<any>(`${path}/${id}`).valueChanges().pipe(
      tap(r => {
        console.groupCollapsed(`Firestore Streaming [${path}] [readcollection$] ${id}`);
        console.log(r);
        console.groupEnd();
        }
      )
    );
  }

  readcollection$(path: string): Observable<any[]> {
    return this.afs.collection<any[]>(path).valueChanges().pipe(
      tap(r => {
          console.groupCollapsed(`Firestore Streaming [${path}] [readcollection$]`);
          console.log(r);
          console.groupEnd();
        }
      )
    );
  }

  create(path: string, value: any) {
    const id = this.afs.createId();
    return this.afs.collection<any>(path).doc(id).set(Object.assign({}, { id }, value)).then(_ => {
            console.groupCollapsed(`Firestore Service [${path}] [create]`);
            console.log('[Id]', id, value);
            console.groupEnd();
        });
  }

  remove(path: string, id: string) {
    return this.afs.collection<any>(path).doc(id).delete().then(_ => {
            console.groupCollapsed(`Firestore Service [${path}] [Delete]`);
            console.log('[Id]', id)
            console.groupEnd();
        });
  }
}
