import { createNamespace } from '../utils';
import Network from './Network';

const [createComponent, bem] = createNamespace('empty');

const PRESETS = ['error', 'search', 'default'];

export default createComponent({
  props: {
    description: String,
    image: {
      type: String,
      default: 'default',
    },
  },

  computed: {
    url() {
      if (PRESETS.indexOf(this.image) !== -1) {
        return `https://img.yzcdn.cn/vant/empty-image-${this.image}.png`;
      }

      return this.image;
    },
  },

  methods: {
    genImageContent() {
      const slots = this.slots('image');

      if (slots) {
        return slots;
      }

      if (this.image === 'network') {
        return <Network />;
      }

      return <img src={this.url} />;
    },

    genImage() {
      return <div class={bem('image')}>{this.genImageContent()}</div>;
    },

    genDescription() {
      const description = this.slots('description') || this.description;

      if (description) {
        return <p class={bem('description')}>{description}</p>;
      }
    },

    genBottom() {
      const slot = this.slots();

      if (slot) {
        return <div class={bem('bottom')}>{slot}</div>;
      }
    },
  },

  render() {
    return (
      <div class={bem()}>
        {this.genImage()}
        {this.genDescription()}
        {this.genBottom()}
      </div>
    );
  },
});
