import React from 'react'
import { Box } from '../primitives'
import { computeSize } from './helper'
import PropTypes from 'prop-types'

const BlockstackLogo = ({
  width,
  typeSize = 16,
  invert,
  color = invert ? 'white' : 'blue.dark',
  ...rest
}) => {
  const baseWidth = 103
  const computedWidth = computeSize(width, baseWidth, typeSize)
  return (
    <Box width={computedWidth} color={color} {...rest}>
      <Box
        is="svg"
        display="inline-block"
        viewBox={`0 0 ${baseWidth} 20`}
        fill="none"
        style={{
          width: '100%'
        }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.246737 1.80856C-8.9407e-08 2.37873 -6.34997e-08 3.10582 0 4.56L2.37855e-07 10L4.75644e-07 15.44C5.39209e-07 16.8942 5.66244e-07 17.6213 0.246737 18.1914C0.549777 18.8917 1.10827 19.4502 1.80856 19.7533C2.37873 20 3.10582 20 4.56 20H10H15.44C16.8942 20 17.6213 20 18.1914 19.7533C18.8917 19.4502 19.4502 18.8917 19.7533 18.1914C20 17.6213 20 16.8942 20 15.44V10V4.56C20 3.10582 20 2.37873 19.7533 1.80856C19.4502 1.10827 18.8917 0.549775 18.1914 0.246736C17.6213 -1.04308e-07 16.8942 -6.34997e-08 15.44 0L10 2.37855e-07L4.56 4.75645e-07C3.10582 5.39209e-07 2.37873 5.66244e-07 1.80856 0.246736C1.10827 0.549778 0.549777 1.10827 0.246737 1.80856ZM13.1928 8.61608C12.1947 8.61608 11.3854 7.80681 11.3854 6.80852C11.3854 5.81073 12.1947 5.00146 13.1928 5.00146C14.1908 5.00146 15.0001 5.81073 15.0001 6.80852C15.0001 7.80681 14.1908 8.61608 13.1928 8.61608ZM8.61312 6.80834C8.61312 7.80596 7.80422 8.61489 6.80637 8.61489C5.80902 8.61489 5.00012 7.80596 5.00012 6.80834C5.00012 5.81072 5.80902 5.00179 6.80637 5.00179C7.80422 5.00179 8.61312 5.81072 8.61312 6.80834ZM13.1929 11.391C12.1946 11.391 11.3854 12.2003 11.3854 13.1983C11.3854 14.1964 12.1946 15.0057 13.1929 15.0057C14.1907 15.0057 15 14.1964 15 13.1983C15 12.2003 14.1907 11.391 13.1929 11.391ZM6.80653 11.3927C7.80414 11.3927 8.61305 12.2016 8.61305 13.1995C8.61305 14.1968 7.80414 15.0057 6.80653 15.0057C5.80892 15.0057 5 14.1968 5 13.1995C5 12.2016 5.80892 11.3927 6.80653 11.3927Z"
          fill="currentColor"
        />
        <path
          d="M31.5625 16C33.9609 16 35.4062 14.7969 35.4062 12.8125C35.4062 11.3125 34.375 10.2266 32.8438 10.0547V9.99219C33.9688 9.80469 34.8516 8.73438 34.8516 7.53906C34.8516 5.83594 33.5391 4.72656 31.5391 4.72656H27.0391V16H31.5625ZM28.7891 6.15625H31.1172C32.3828 6.15625 33.1016 6.73438 33.1016 7.78125C33.1016 8.89844 32.2656 9.52344 30.75 9.52344H28.7891V6.15625ZM28.7891 14.5703V10.8594H31.1016C32.7578 10.8594 33.6172 11.4844 33.6172 12.7031C33.6172 13.9219 32.7812 14.5703 31.2031 14.5703H28.7891Z"
          fill="currentColor"
        />
        <path d="M36.9334 16H38.6209V4.72656H36.9334V16Z" fill="currentColor" />
        <path
          d="M44.0466 16.1562C46.3981 16.1562 47.945 14.5391 47.945 11.8906C47.945 9.25 46.3903 7.63281 44.0466 7.63281C41.7028 7.63281 40.1481 9.25 40.1481 11.8906C40.1481 14.5391 41.695 16.1562 44.0466 16.1562ZM44.0466 14.7656C42.7262 14.7656 41.8669 13.7188 41.8669 11.8906C41.8669 10.0703 42.7262 9.02344 44.0466 9.02344C45.3669 9.02344 46.2262 10.0703 46.2262 11.8906C46.2262 13.7188 45.3747 14.7656 44.0466 14.7656Z"
          fill="currentColor"
        />
        <path
          d="M56.4644 10.6094C56.3159 8.99219 55.0269 7.63281 52.9097 7.63281C50.5737 7.63281 49.0425 9.28125 49.0425 11.8906C49.0425 14.5469 50.5737 16.1562 52.9253 16.1562C54.9019 16.1562 56.3003 14.9688 56.48 13.2188H54.855C54.6597 14.1719 53.98 14.7422 52.9409 14.7422C51.6284 14.7422 50.7612 13.6953 50.7612 11.8906C50.7612 10.125 51.6206 9.03906 52.9253 9.03906C54.0269 9.03906 54.6831 9.73438 54.855 10.6094H56.4644Z"
          fill="currentColor"
        />
        <path
          d="M59.6009 11.3047H59.5853V4.72656H57.8978V16H59.5853V13.0469L60.2884 12.3516L63.0775 16H65.0384L61.4994 11.3203L64.9056 7.78125H62.9212L59.6009 11.3047Z"
          fill="currentColor"
        />
        <path
          d="M65.6594 10.1094C65.6594 11.3047 66.4328 12.0547 67.9953 12.4141L69.3312 12.7266C70.2297 12.9297 70.5344 13.2422 70.5344 13.7734C70.5344 14.4453 69.9094 14.8672 68.8937 14.8672C67.8625 14.8672 67.2766 14.4453 67.1203 13.5859H65.4484C65.6047 15.1484 66.8391 16.1562 68.8937 16.1562C70.8312 16.1562 72.2297 15.125 72.2297 13.625C72.2297 12.4375 71.5891 11.7812 69.9094 11.3906L68.5734 11.0859C67.6828 10.8828 67.3078 10.5312 67.3078 10.0156C67.3078 9.35938 67.9172 8.91406 68.8312 8.91406C69.7766 8.91406 70.3625 9.41406 70.4562 10.2109H72.0422C71.9875 8.69531 70.7453 7.63281 68.8312 7.63281C66.9406 7.63281 65.6594 8.64062 65.6594 10.1094Z"
          fill="currentColor"
        />
        <path
          d="M74.1944 5.83594V7.78125H72.9991V9.11719H74.1944V13.8359C74.1944 15.4219 74.8428 16.0547 76.5069 16.0547C76.8819 16.0547 77.2569 16.0234 77.4444 15.9766V14.6406C77.335 14.6641 77.0616 14.6797 76.8897 14.6797C76.2022 14.6797 75.8897 14.3594 75.8897 13.6484V9.11719H77.4522V7.78125H75.8897V5.83594H74.1944Z"
          fill="currentColor"
        />
        <path
          d="M81.7528 14.8047C80.8466 14.8047 80.2528 14.3359 80.2528 13.6172C80.2528 12.9141 80.8231 12.4688 81.8309 12.3984L83.8544 12.2734V12.9219C83.8544 13.9922 82.9325 14.8047 81.7528 14.8047ZM81.2841 16.1406C82.3622 16.1406 83.4012 15.5625 83.8778 14.6484H83.9169V16H85.5341V10.3359C85.5341 8.6875 84.2606 7.63281 82.2684 7.63281C80.2372 7.63281 78.9716 8.72656 78.8778 10.2109H80.4716C80.62 9.47656 81.2294 9.00781 82.2059 9.00781C83.2372 9.00781 83.8544 9.55469 83.8544 10.4688V11.1016L81.6044 11.2344C79.6512 11.3438 78.5497 12.2266 78.5497 13.6641C78.5497 15.1406 79.6747 16.1406 81.2841 16.1406Z"
          fill="currentColor"
        />
        <path
          d="M94.3894 10.6094C94.2409 8.99219 92.9519 7.63281 90.8347 7.63281C88.4987 7.63281 86.9675 9.28125 86.9675 11.8906C86.9675 14.5469 88.4987 16.1562 90.8503 16.1562C92.8269 16.1562 94.2253 14.9688 94.405 13.2188H92.78C92.5847 14.1719 91.905 14.7422 90.8659 14.7422C89.5534 14.7422 88.6862 13.6953 88.6862 11.8906C88.6862 10.125 89.5456 9.03906 90.8503 9.03906C91.9519 9.03906 92.6081 9.73438 92.78 10.6094H94.3894Z"
          fill="currentColor"
        />
        <path
          d="M97.5259 11.3047H97.5103V4.72656H95.8228V16H97.5103V13.0469L98.2134 12.3516L101.003 16H102.963L99.4244 11.3203L102.831 7.78125H100.846L97.5259 11.3047Z"
          fill="currentColor"
        />
      </Box>
    </Box>
  )
}

BlockstackLogo.propTypes = {
  width: PropTypes.oneOf([PropTypes.number, PropTypes.string, PropTypes.array]),
  typeSize: PropTypes.number,
  invert: PropTypes.bool,
  color: PropTypes.string
}

export default BlockstackLogo