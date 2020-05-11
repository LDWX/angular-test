import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.less']
})
export class ObservableComponent implements OnInit {
  myObservable: Observable<number> = of(1, 2, 3)
  sequence = new Observable(this.sequenceSubscriber)


  constructor() { }

  ngOnInit(): void {
    /**
     * observer = new Observable(func)
     * observer在调用subscribe的时候就会执行 func 函数，并将 func 函数绑定在
     * 返回对象的 unsubscribe 上。调用 unsubscribe, observer就会停止接受通知。
     * 没调用 unsubscribe 前，每次触发 observer 的 next 事件， 就会将 next 中的
     * 值作为 参数 传入 subsscribe 中的 next 回调函数，并执行该回调函数
     */
    const ESC_KEY = 27
    let nameInput = document.querySelector("#name") as HTMLInputElement
    const subscription = this.formEvent(nameInput, 'keydown')
    const canUnsubscribe = subscription.subscribe( (e:KeyboardEvent) => {
      if (e.keyCode === ESC_KEY) {
        nameInput.value = "hello"
      }
    })

    // 单播
    // const sequence = new Observable(this.sequenceSubscriber)
    // sequence.subscribe(
    //     num => console.log(num),
    //     null,
    //     () => console.log("finish sequence")
    //   )
    // setTimeout( () => {
    //   sequence.subscribe(
    //     num => console.log(num),
    //     null,
    //     () => console.log("finish sequence")
    //   )
    // }, 500 )

    // 多播
    const multicastSequence = new Observable(this.multicastSequenceSubscriber());
    multicastSequence.subscribe(
      num => console.log('1st subscribe: ', num),
      err => console.log('1st err: ', err),
      () => console.log("1st sequence finished")
    )

    setTimeout( () => {
      multicastSequence.subscribe(
        num => console.log('2st subscribe: ', num),
        err => console.log('2st err: ', err),
        () => console.log("2st sequence finished")
      )

    }, 1500)


  }

  // 单播
  sequenceSubscriber(observer) {
    const seq = [1, 2, 3];
    let timeoutId;

    function doSequence(arr, idx) {
      timeoutId = setTimeout( () => {
        observer.next( arr[idx] );
        if (idx === arr.length - 1) {
          observer.complete();
        } else {
          doSequence(arr, ++idx)
        }
      }, 1000)
    }

    doSequence(seq, 0)

    return {
      unsubscribe() {
        clearTimeout(timeoutId)
      }
    }
  }


  // 多播
  multicastSequenceSubscriber() {
    const seq = [1, 2, 3];
    const observers = [];

    let timeoutId;

    return (observer) => {
      observers.push(observer);

      // 只有第一个订阅者出现时才进行处理，从而保证后续的订阅者不会新开一个事件处理
      if (observers.length === 1) {
        timeoutId = this.doSequence( {
          next(val) {
            console.log("next")
            observers.forEach( obs => obs.next(val) )
          },
          complete() {
            console.log("complete")
            let arr = observers
            arr.forEach( obs => {
              obs.complete()
              console.log(arr.length)
            })

          }
        },
        seq, 0)
      }

      return {
        unsubscribe() {
          observers.splice(observers.indexOf(observer), 1)
          if (observers.length === 0) {
            clearTimeout(timeoutId)
          }
        }
      }
    }
  }
  doSequence(observer, arr, idx) {
    return setTimeout( () => {
      // 这个observer虽然是我们自己定义的，但是它使得在 observers 数组中的 observer 获取的
      // 值都是相同的。
      console.log("执行回调")
      observer.next(arr[idx])
      if (idx === arr.length - 1) {
        observer.complete()
      } else {
        this.doSequence(observer, arr, ++idx)
      }
    }, 1000)
  }



  // 事件代理
  formEvent(target, eventName) {
    return new Observable( observer => {
      const handler = e => observer.next(e)

      target.addEventListener(eventName, handler)

      return () => {
        target.removeEventListener(eventName, handler)
      }
    })
  }

}
