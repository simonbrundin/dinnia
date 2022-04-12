import { resolve } from 'path'

const icons = [
  'ChevronLeft',
  'ChevronUp',
  'ChevronDown',
  'ChevronRight',
  'CartOutline',
  'CartPlus',
]

export default function () {
  this.nuxt.hook('components:dirs', (dirs) => {
    dirs.push({
      path: resolve('node_modules/vue-material-design-icons'),
      prefix: 'MaterialIcon',
      pattern: `**/@(${icons.join('|')}).vue`,
    })
  })
}
