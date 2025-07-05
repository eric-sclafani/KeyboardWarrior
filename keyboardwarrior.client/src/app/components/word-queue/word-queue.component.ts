import { NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    input,
    model,
    signal,
} from '@angular/core';

@Component({
    selector: 'app-word-queue',
    imports: [NgClass],
    templateUrl: './word-queue.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './word-queue.component.scss',
})
export class WordQueueComponent {
    inputSentence = input.required<string>();
    pressedKey = input.required<string | null>();

    currentKeyIndex = model(0);
    currentChar = computed(() => this.inputSentence()[this.currentKeyIndex()]);
    pressedIndexes: number[] = [];

    constructor() {
        effect(() => this.onKeyPress(this.pressedKey()));
    }

    applyCharClasses(index: number): Record<string, boolean> {
        return {
            'pressed-correct-char': this.pressedIndexes.includes(index),
            'current-char': this.currentKeyIndex() == index,
        };
    }

    onKeyPress(key: string | null) {
        if (key == this.currentChar()) {
            this.pressedIndexes.push(this.currentKeyIndex());
            this.currentKeyIndex.update((val) => ++val);
        }
    }
}
