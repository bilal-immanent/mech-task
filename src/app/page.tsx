import Image from 'next/image'
import './page.css'
import { useMachine } from '@xstate/react';
import { MyMachineReactContext, feedbackMachine } from '../../machine/machine';

export default function Home() {
  const [state, send] = MyMachineReactContext.useActor();

  if (state.matches('closed')) {
    return (
      <div>
        <em>Feedback form closed.</em>
        <br />
        <button
          onClick={() => {
            send({ type: 'restart' });
          }}
        >
          Provide more feedback
        </button>
      </div>
    );
  }

  return (
    // <main className={styles.main}>
    //   <div className={styles.description}>
    //     <p>
    //       Get started by editing&nbsp;
    //       <code className={styles.code}>src/app/page.tsx</code>
    //     </p>
    //     <div>
    //       <a
    //         href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         By{' '}
    //         <Image
    //           src="/vercel.svg"
    //           alt="Vercel Logo"
    //           className={styles.vercelLogo}
    //           width={100}
    //           height={24}
    //           priority
    //         />
    //       </a>
    //     </div>
    //   </div>

    //   <div className={styles.center}>
    //     <Image
    //       className={styles.logo}
    //       src="/next.svg"
    //       alt="Next.js Logo"
    //       width={180}
    //       height={37}
    //       priority
    //     />
    //   </div>

    //   <div className={styles.grid}>
    //     <a
    //       href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className={styles.card}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2>
    //         Docs <span>-&gt;</span>
    //       </h2>
    //       <p>Find in-depth information about Next.js features and API.</p>
    //     </a>

    //     <a
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className={styles.card}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2>
    //         Learn <span>-&gt;</span>
    //       </h2>
    //       <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
    //     </a>

    //     <a
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className={styles.card}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2>
    //         Templates <span>-&gt;</span>
    //       </h2>
    //       <p>Explore the Next.js 13 playground.</p>
    //     </a>

    //     <a
    //       href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className={styles.card}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2>
    //         Deploy <span>-&gt;</span>
    //       </h2>
    //       <p>
    //         Instantly deploy your Next.js site to a shareable URL with Vercel.
    //       </p>
    //     </a>
    //   </div>
    // </main>
    <div className="feedback">
      <button
        className="close-button"
        onClick={() => {
          send({ type: 'close' });
        }}
      >
        Close
      </button>
      {state.matches('prompt') && (
        <div className="step">
          <h2>How was your experience?</h2>
          <button
            className="button"
            onClick={() => send({ type: 'feedback.good' })}
          >
            Good
          </button>
          <button
            className="button"
            onClick={() => send({ type: 'feedback.bad' })}
          >
            Bad
          </button>
        </div>
      )}

      {state.matches('thanks') && (
        <div className="step">
          <h2>Thanks for your feedback.</h2>
          {state.context.feedback.length > 0 && (
            <p>{state.context.feedback}</p>
          )}
        </div>
      )}

      {state.matches('form') && (
        <form
          className="step"
          onSubmit={(ev) => {
            ev.preventDefault();
            send({
              type: 'submit'
            });
          }}
        >
          <h2>What can we do better?</h2>
          <textarea
            name="feedback"
            rows={4}
            placeholder="So many things..."
            onChange={(ev) => {
              send({
                type: 'feedback.update',
                value: ev.target.value
              });
            }}
          />
          <button className="button" disabled={!state.can({ type: 'submit' })}>
            Submit
          </button>
          <button
            className="button"
            type="button"
            onClick={() => {
              send({ type: 'back' });
            }}
          >
            Back
          </button>
        </form>
      )}
    </div>
  )
}
