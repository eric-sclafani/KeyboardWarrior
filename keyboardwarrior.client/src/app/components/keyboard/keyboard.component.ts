import {
    ChangeDetectionStrategy,
    Component,
    computed,
    OnDestroy,
    OnInit,
    output,
    signal,
} from '@angular/core';
import { fromEvent, Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-keyboard',
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './keyboard.component.html',
    styleUrl: './keyboard.component.scss',
})
export class KeyboardComponent implements OnInit {
    currentKey = signal<null | string>(null);
    displayKeyPressed = computed<string>(
        () => this.currentKey()?.toLowerCase() ?? '',
    );
    currentKeyOutput = output<null | string>();
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
        this.keydown$.pipe(takeUntil(this.destroy$)).subscribe((e) => {
            this.setSpecialKeyLocation(e);

            setTimeout(() => this.currentKey.set(null), 800);
        });
    }

    private setSpecialKeyLocation(e: KeyboardEvent): void {
        let value = '';
        if (e.key == 'Shift' && e.location == 1) {
            value = 'leftshift';
        } else if (e.key == 'Shift' && e.location == 2) {
            value = 'rightshift';
        } else if (e.key == 'Control' && e.location == 1) {
            value = 'leftctrl';
        } else if (e.key == 'Control' && e.location == 2) {
            value = 'rightctrl';
        } else if (e.key == 'Alt' && e.location == 1) {
            value = 'leftalt';
        } else if (e.key == 'Alt' && e.location == 2) {
            value = 'rightalt';
        } else if (e.key == 'Meta' && e.location == 1) {
            value = 'leftmeta';
        } else if (e.key == 'Meta' && e.location == 2) {
            value = 'rightmeta';
        } else {
            value = e.key;
        }
        this.currentKey.update(() => value);
        this.currentKeyOutput.emit(value);
    }
}
