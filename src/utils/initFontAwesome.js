import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faFrown,
  faSmileBeam,
  faLink,
  faPowerOff,
  faUser,
} from '@fortawesome/free-solid-svg-icons'

function initFontAwesome() {
  library.add(faFrown)
  library.add(faSmileBeam)
  library.add(faLink)
  library.add(faUser)
  library.add(faPowerOff)
}

export default initFontAwesome
