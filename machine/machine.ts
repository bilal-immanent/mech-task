// import { createActorContext } from "@xstate/react";
// import { createMachine } from "xstate";

// export const myMachine = createMachine({
//   /** @xstate-layout N4IgpgJg5mDOIC5QFsCeBZAhgYwBYEsA7MAYgCMBXAFyoHtCBGAYQBt9sBrSAbQAYBdRKAAOtWPir56QkAA9EAFgBMAGhCpEDAJwAOAHQKtRgOw6jAViUBmXjqsBfe2rRY8RUpRr0lrdlwh8gkggouKS0sHyCMpqGggMVlp6Rim8WlY6DAo6CsaOzhg4BMTk1HSEVr6cPAIyoRJShDJRMeqImXrmvN28SjqZvABsgwwMjk4ghLQQcDIuRe51Yg0RoFEAtIOxiJv5IPNuxHqwVJhUYAxLYY3NiEoJelYKVsbmOrwvg13mW23xuskUlpzFYusZXjpBnsDsUwMdTuclFcVk1IncHk8Xm8PsYvrwftt4gpeAYgWkMlkcnkJjD3PCzmArMjwqi1uirI9nhCcXiCX8dEo9D1eNprMNRllxvYgA */
//   id: "myMachine",
//   initial: `state1`,
//   on: {
//     button1Clicked: `state1`,
//     button2Clicked: `state2`,
//     button3Clicked: `state3`
//   },
//   states: {
//     state1: {},
//     state2: {},
//     state3: {}
//   }
// });

// export const MyMachineReactContext = createActorContext(myMachine);


import { createActorContext } from '@xstate/react';
import { assign, createMachine } from 'xstate';

const schema = {
  context: {} as { feedback: string },
  events: {} as
    | {
        type: 'feedback.good';
      }
    | {
        type: 'feedback.bad';
      }
    | {
        type: 'feedback.update';
        value: string;
      }
    | { type: 'submit' }
    | {
        type: 'close';
      }
    | { type: 'back' }
    | { type: 'restart' }
};

export const feedbackMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDMyQEYEMDGBrAxNgDYD2sYA2gAwC6ioADmQJYAuzJAdvSAB6IAWAEwAaEAE9EARgDsADgB0QqgGYp61VJVqZKgL56xqDDlwKGAJxIBbBq3zGIWPAqgkSEanSQgmsNhzcPvwIAKxSAgoAnHICKjJSUTIAbPGhMmKSCCpUQgoymgLJUVLKVFQpBkZoTqbmVrb2js5mWJ60PH4BXDwh4ZExcQlJqTLpmYhCygoqQnJSubNFoXFVIM11yCQW1vgtXp0s7D3BiKFyUQrl5UJjUVECoWoTCFLFCnJz6ipR2qHp-zWGxcWx2+FgAFd0NY2AcfF1jkFQCE5KkFOk5FQkisBFJ-lEXlJ5tEnliEipkkISqEhECai0FMQyJB8BY4KxMBZWHDGEdAr1JslQh8vrNQuUVOkKYT5EpNBo1NpZPo1pwPHAeMDcId-IiBQgALTJF6fGZfW5zFJqOZ0kwuSw2Ow67pIviIeIyaKxFRyJazX0ZCTSWUFNQKrQ6FXVO1mUHWZ1604IBJSaJU5IyeS-FJ4wmmx45JJaSnU2mGdb0uqsAAWmE4uHg8L5J2R0iowgUsiJCSpt0SoTzl1DpSp1JW8lttRcTPIEAT-KTERUIvmVLkMimQnCKhlimH4aVugMBiAA */
  id: 'feedback',
  initial: 'prompt',
  schema,
  context: {
    feedback: ''
  },
  states: {
    prompt: {
      on: {
        'feedback.good': 'thanks',
        'feedback.bad': 'form'
      }
    },
    form: {
      on: {
        back: { target: 'prompt' },

        submit: {
          cond: (ctx) => ctx.feedback.length > 0,
          target: 'thanks'
        }
      }
    },
    thanks: {},
    closed: {
      on: {
        restart: 'prompt'
      }
    }
  },
  on: {
    close: 'closed'
  }
});
export const MyMachineReactContext = createActorContext(feedbackMachine);