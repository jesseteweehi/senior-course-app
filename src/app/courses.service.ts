import { Injectable, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app'; 
import 'firebase/firestore';
import { Observable, combineLatest } from 'rxjs';
import { tap, map, mergeMap, toArray } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

constructor(
  @Inject(AngularFirestore) private afs: AngularFirestore,
) {}

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  readdoc$(path: string, id: string): Observable<any> {
    return this.afs.doc<any>(`${path}/${id}`).valueChanges()
    .pipe(
      tap(r => {
        console.groupCollapsed(`Firestore Streaming [${path}] [readdoc$] ${id}`);
        console.log(r);
        console.groupEnd();
        }
      )
    );
  }

  querycollection$(path: string, key: string, cond: any, query: string): Observable<any[]> {
    return this.afs.collection<any[]>(path, ref => ref.where(key, cond, query)).valueChanges().pipe(
      tap(r => {
          console.groupCollapsed(`Firestore Streaming [${path}] [readcollection$]`);
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

  findItemsForKeyList(path: string, ob: Observable<any[]>): Observable<any> {
    return ob.pipe(
            map(x => {
                if (x === undefined) {
                    return [];
                } else {
                    return x;
                }
            }),
            map(observ => observ.map(key => this.readdoc$(path, key.identifier))),
            mergeMap(item => combineLatest(item)),
            );
  }

  findItemsForAllStandards(ob: Observable<any[]>): Observable<any> {
    return ob.pipe(
            map(x => {
                if (x === undefined) {
                    return [];
                } else {
                    return x;
                }
            }),
            tap(c => console.log(c)),
            map(observ => observ.map(key => this.readdoc$(`courses/${key.courseid}/standards`, key.identifier))),
            mergeMap(item => combineLatest(item)),
            );
  }

  // take a collection.
  // gain a list of document keys from the collection
  // map these keys and call the documents from firestore using the maped keys
  // compose a observable of the mapped documents to return.

  // function needs the path where the documents keys from alternative place (user source) are held
  // also needs the path for where the full documents are held. So can return these documents
  readcollectionsdifferentpaths(dockeypath: string, docpath: string): Observable<any[]> {
    return this.findItemsForKeyList(docpath, this.readcollection$(dockeypath)).pipe(
      tap(r => {
        console.groupCollapsed(`Firestore Streaming [${docpath}] [returndocsdifferentpaths$]`);
        console.log(r);
        console.groupEnd();
      }),
    );
  }

  readcollectionsCourses$(dockeypath: string, docpath: string, query: string): Observable<any[]> {
    return this.findItemsForKeyList(docpath, this.querycollection$(dockeypath, 'courseid' , '==', query ).pipe(
      tap(r => {
        console.groupCollapsed(`Firestore Streaming [${docpath}] [returndocsdifferentpaths$]`);
        console.log(r);
        console.groupEnd();
      })
    ));
  }

  readcollectionsAllStandards(dockeypath: string): Observable<any[]> {
    return this.findItemsForAllStandards(this.readcollection$(dockeypath)).pipe(
      tap(r => {
        console.groupCollapsed(`Firestore Streaming [${dockeypath}] [eadcollectionAllStandards$]`);
        console.log(r);
        console.groupEnd();
      }),
    );
  }

  createWithJustId(path: string, id: string) {
    return this.afs.collection<any>(path).doc(id).set({identifier : id}).then(_ => {
      console.groupCollapsed(`Firestore Service [${path}] [createWithJustId]`);
      console.log('[id]', id );
      console.groupEnd();
    });
  }

  createWithId(path: string, id: string, value: any) {
    return this.afs.collection<any>(path).doc(id).set(Object.assign({}, { id }, value)).then(_ => {
      console.groupCollapsed(`Firestore Service [${path}] [createWithId]`);
      console.log('[id]', id );
      console.groupEnd();
    });
  }

  create(path: string, value: any) {
    const id = this.afs.createId();
    return this.afs.collection<any>(path).doc(id).set(Object.assign({date_created : this.timestamp }, { id }, value)).then(_ => {
            console.groupCollapsed(`Firestore Service [${path}] [create]`);
            console.log('[Id]', id, value);
            console.groupEnd();
        });
  }

  update(path: string, value: any) {
    return this.afs.doc<any>(path).update(Object.assign({date_updated : this.timestamp }, value)).then(_ => {
      console.groupCollapsed(`Firestore Service [${path}] [update]`);
      console.log(value);
      console.groupEnd();
    });
  }

  remove(path: string, id: string) {
    return this.afs.collection<any>(path).doc(id).delete().then(_ => {
            console.groupCollapsed(`Firestore Service [${path}] [Delete]`);
            console.log('[Id]', id);
            console.groupEnd();
        });
  }
}
