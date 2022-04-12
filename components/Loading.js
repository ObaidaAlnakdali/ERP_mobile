import React from 'react'
import { View } from 'react-native';

function Loading() {
  return (
      <View style={style.loading}>
          <View style={style.loader}>
              <View style={style.shadow}></View>
              <View style={style.box}></View>
          </View>
      </View>
  )
}

const style = {

    loading : {
        position: 'absolute',
        top: 200,
        left: '50%',
      },
      
      loader : { 
          position: 'absolute',
          top: 50 - 20,
          left: 50 - 20,
      },
      
        box:  {
          width: 50,
          height: 50,
          background: '#8ab038',
          position: 'absolute',
          top: 0,
          left: 0,
          borderRadius: 3,
        },

        shadow: { 
            width: 50,
            height: 5,
            background: 'black',
            opacity: 0.1,
            position: 'absolute',
            top: 59,
            left: 0,
            borderRadius: 25,
          },
      
        // @keyframes loader {
        //     0% { left: -100px }
        //     100% { left: 110%; }
        //   },
      
        // @keyframes animate {
        //   17% { border-bottom-right-radius: 3px; }
        //   25% { transform: translateY(9px) rotate(22.5deg); }
        //   50% {
        //     transform: translateY(18px) scale(1,.9) rotate(45deg) ;
        //     border-bottom-right-radius: 40px;
        //   },

        //   75% { transform: translateY(9px) rotate(67.5deg); }
        //   100% { transform: translateY(0) rotate(90deg); }
        // },
      
        // @keyframes shadow {
        //   50% {
        //     transform: scale(1.2,1);
        //   }
        // }
      
}

export default Loading