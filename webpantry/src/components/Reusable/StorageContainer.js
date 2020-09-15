import React, { useRef, useState, useEffect } from 'react';
import Storage from './Storage';

import clamp from 'lodash-es/clamp';
import { useSprings, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';

import './../../test.css';

const StorageColors = ['#63d2d4', '#ffde9f', '#ffee60']

const StorageContainer = (props) => {
  const { storage } = props;
  const [isOpen, setIsOpen] = useState([]);

  const index = useRef(0);
  const [springProps, set] = useSprings(storage.length, (i) => ({
    x: i * window.innerWidth,
    sc: 1,
    display: 'block',
  }));


  const onStorageClick = (i) => {
    const updatedOpenState = [...isOpen]
    updatedOpenState[i] = !updatedOpenState[i]
    if (index.current === i) {
      setIsOpen([...updatedOpenState])
    }
  }

  useEffect(() => {
    const storageOpenState = storage.map((stor, index) => false)
    setIsOpen(storageOpenState)
  }, [storage])


  const bind = useGesture(
    {
      onDrag: ({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
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
        onClick={onStorageClick}
        index={i}
        key={storage[i].id}
        ingredients={storage[i].items}
        name={storage[i].name}
        isOpen={isOpen[i]}
        styles={{
          transform: sc.interpolate((s) => `scale(${s})`),
          backgroundColor: StorageColors[i]
        }}
      />
    </animated.div>
  ));
};

export default StorageContainer;
