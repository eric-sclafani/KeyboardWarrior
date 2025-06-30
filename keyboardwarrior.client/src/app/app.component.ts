import {
    Component,
    HostListener,
    OnDestroy,
    OnInit,
    signal,
} from '@angular/core';
import { fromEvent, Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-root',
    imports: [],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
    currentKey = signal<null | string>(null);
    keydown$ = fromEvent(window, 'keydown') as Observable<KeyboardEvent>;

    destroy$ = new Subject<void>();

    ngOnInit(): void {
        this.initKeySub();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private initKeySub() {
        this.keydown$.pipe(takeUntil(this.destroy$)).subscribe((d) => {
            console.log(d.key, d.location);

            d.preventDefault();

            if (d.key == 'Shift' && d.location == 1) {
                this.currentKey.update(() => 'leftshift');
            } else if (d.key == 'Shift' && d.location == 2) {
                this.currentKey.update(() => 'rightshift');
            } else if (d.key == 'Control' && d.location == 1) {
                this.currentKey.update(() => 'leftctrl');
            } else if (d.key == 'Control' && d.location == 2) {
                this.currentKey.update(() => 'rightctrl');
            } else if (d.key == 'Alt' && d.location == 1) {
                this.currentKey.update(() => 'leftalt');
            } else if (d.key == 'Alt' && d.location == 2) {
                this.currentKey.update(() => 'rightalt');
            } else if (d.key == 'Meta' && d.location == 1) {
                this.currentKey.update(() => 'leftmeta');
            } else if (d.key == 'Meta' && d.location == 2) {
                this.currentKey.update(() => 'rightmeta');
            } else {
                this.currentKey.update(() => d.key.toLowerCase());
            }

            setTimeout(() => this.currentKey.set(null), 800);
        });
    }
}
