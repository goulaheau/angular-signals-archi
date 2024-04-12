import { Injectable } from '@angular/core';
import { PickByValue } from 'utility-types';

@Injectable()
export class RecordHelper {
  mapArrayToRecordByUniqueKey<T, TKey extends keyof PickByValue<T, PropertyKey>>(
    array: T[],
    key: TKey
    // @ts-expect-error Typescript can't figure out that T[TKey] === PropertyKey.
  ): Record<T[TKey], T | undefined> {
    return array.reduce(
      (accumulator, item) => {
        accumulator[item[key]] = item;

        return accumulator;
      },
      // @ts-expect-error Typescript can't figure out that T[TKey] === PropertyKey.
      {} as Record<T[TKey], T>
    );
  }

  mapArrayToRecordByNonUniqueKey<T, TKey extends keyof PickByValue<T, PropertyKey>>(
    array: T[],
    key: TKey
    // @ts-expect-error Typescript can't figure out that T[TKey] === PropertyKey.
  ): Record<T[TKey], T[] | undefined> {
    return array.reduce(
      (accumulator, item) => {
        if (!accumulator[item[key]]) {
          accumulator[item[key]] = [];
        }

        accumulator[item[key]].push(item);

        return accumulator;
      },
      // @ts-expect-error Typescript can't figure out that T[TKey] === PropertyKey.
      {} as Record<T[TKey], T[]>
    );
  }

  reverseRecord<TKey extends PropertyKey, TValue extends PropertyKey>(
    record: Record<TKey, TValue>
  ): Record<TValue, TKey | undefined> {
    return Object.keys(record).reduce(
      (accumulator, key) => {
        // @ts-expect-error Typescript can't figure out that T[TKey] === PropertyKey.
        const value = record[key] as TValue;
        accumulator[value] = key as TKey;

        return accumulator;
      },
      {} as Record<TValue, TKey>
    );
  }

  isObjectContaining<T extends PropertyKey>(value: unknown, key: T): value is Record<T, unknown> {
    return typeof value === 'object' && !!value && key in value;
  }
}
