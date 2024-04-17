const breakpointXs = 480
const breakpointSm = 576
const breakpointMd = 768
const breakpointLg = 992
const breakpointXl = 1200
const breakpointXxl = 1400
const breakpointXsMax = breakpointSm - 1
const breakpointSmMax = breakpointMd - 1
const breakpointMdMax = breakpointLg - 1
const breakpointLgMax = breakpointXl - 1
const breakpointXlMax = breakpointXxl - 1

export default {
  xs: `${breakpointXs}px`,
  xsMax: `${breakpointXsMax}px`,
  sm: `${breakpointSm}px`,
  smMax: `${breakpointSmMax}px`,
  md: `${breakpointMd}px`,
  mdMax: `${breakpointMdMax}px`,
  lg: `${breakpointLg}px`,
  lgMax: `${breakpointLgMax}px`,
  xl: `${breakpointXl}px`,
  xlMax: `${breakpointXlMax}px`,
  xxl: `${breakpointXxl}px`,
}
