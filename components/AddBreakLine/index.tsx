import { Fragment } from 'react';

export function AddBreakLine({ children }: { children: string }) {
  const lines = children.split('\n');

  return (
    <>
      {lines.map((line, index) => {
        if (index + 1 === lines.length) {
          return <Fragment key={index}>{line}</Fragment>;
        }

        return (
          <Fragment key={index}>
            {line}
            <br />
          </Fragment>
        );
      })}
    </>
  );
}
