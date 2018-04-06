import { Injectable } from '@angular/core';

@Injectable()
export class HelpersService {
  constructor() {}

  static shuffleArray(array: Array<any>): Array<any> {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  static textCompare(value1: string, value2: string): boolean {
    value1 = value1.trim().toLowerCase();
    value2 = value2.trim().toLowerCase();

    if (value1 === value2) {
      return true;
    }

    value1 = this.textSimplify(value1);
    value2 = this.textSimplify(value2);

    if (value1 === value2) {
      return true;
    }

    // TODO: Comparar se parte de texto esta contido

    return false;
  }

  static textSimplify(value: string): string {
    return value
      .replace(/[\. ,:-]+/g, '')
      .replace(/(\w)\1+/g, (str, match) => match[0]);
  }

  static extractIdFromUrl(url: string): number {
    const parts = url.trim().split('/');
    return +(parts[parts.length - 1] || parts[parts.length - 2]);
  }
}
