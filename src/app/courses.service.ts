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

  readdoc$(path: string, id: string): Observable<T> {
    return this.afs.doc<T>(`${path}/${id}`).valueChanges().pipe(
      tap(r => {
        console.groupCollapsed(`Firestore Streaming [${path}] [readcollection$] ${id}`);
        console.log(r);
        console.groupEnd();
        }
      )
    );
  }

  readcollection$(path: string): Observable<T[]> {
    return this.afs.collection<T[]>(path).valueChanges().pipe(
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
    return this.afs.collection<T>(path).doc(id).set(Object.assign({}, { id }, value)).then(_ => {
            console.groupCollapsed(`Firestore Service [${path}] [create]`);
            console.log('[Id]', id, value);
            console.groupEnd();
        });
  }

}
