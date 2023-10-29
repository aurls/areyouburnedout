interface Descriptor {
  min: number
  max: number
  icon: string
  description: string
}

const descriptors: Descriptor[] = [
  {
    min: 0,
    max: 0.6,
    icon: '😮',
    description: 'Still have something to burn. Get back to work!'
  },
  {
    min: 0.6,
    max: 1,
    icon: '😭',
    description: 'All that\'s left of you is ashes. Anyway, get back to work!'
  }
];

export type { Descriptor };

export default descriptors;
