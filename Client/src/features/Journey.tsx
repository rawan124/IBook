import { Timeline } from 'antd';

const Journey = () => (
  <Timeline
    items={[
      { content: 'Create an account to join IBook' },
      { content: 'Log in to your account' },
      { content: 'Discover and review your favorite books' },
      { content: 'Share feedback and ratings with the community' },
    ]}
  />
);

export default Journey;
