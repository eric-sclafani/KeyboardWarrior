import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    signal,
} from '@angular/core';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { WordQueueComponent } from './components/word-queue/word-queue.component';

@Component({
    selector: 'app-root',
    imports: [KeyboardComponent, WordQueueComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    currentKey = signal<string | null>(null);

    sentences = ['The quick brown fox jumped over the turtle'];

    updateCurrentKey(value: string | null) {
        console.info(`Current Key: ${value}`);
        this.currentKey.update(() => value);
    }
}
