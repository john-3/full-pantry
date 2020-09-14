import React, { useRef } from 'react';
import Storage from './Storage';

import clamp from 'lodash-es/clamp';
import { useSprings, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

import './../../test.css';

const StorageContainer = (props) => {
  const { storage } = props;

  const storageItems =
    storage &&
    storage.map((item) => (
      <Storage
        id={item.id}
        key={item.id}
        ingredients={item.items}
        name={item.name}
      />
    ));

  const index = useRef(0);
  const [springProps, set] = useSprings(storage.length, (i) => ({
    x: i * window.innerWidth,
    sc: 1,
    display: 'block',
    border: '1px solid brown',
  }));

  const bind = useDrag(
    ({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
      if (down && distance > window.innerWidth / 20)
        cancel(
          (index.current = clamp(
            index.current + (xDir > 0 ? -1 : 1),
            0,
            storage.length - 1
          ))
        );
      set((i) => {
        if (i < index.current - 1 || i > index.current + 1)
          return { display: 'none' };
        const x = (i - index.current) * window.innerWidth + (down ? mx : 0);
        const scale = down ? 1 - distance / window.innerWidth / 2 : 1;
        return { x, scale, display: 'block' };
      });
    }
  );

  return springProps.map(({ x, display, sc }, i) => (
    <animated.div
      {...bind()}
      key={i}
      style={{
        display,
        transform: x.interpolate((x) => `translate3d(${x}px,0,0)`),
      }}
    >
      <Storage
        id={storage[i].id}
        key={storage[i].id}
        ingredients={storage[i].items}
        name={storage[i].name}
        style={{
          transform: sc.interpolate((s) => `scale(${s})`),
        }}
      />
    </animated.div>
  ));
};

export default StorageContainer;
