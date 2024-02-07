export function getWindDirection(degress) {
    switch(Math.floor((degress/45)%8)){
        case 0:
            return "Norte";
        case 1:
            if (degress >= 22.5 && degress < 45) {
                return "Norte-noroeste";
            } else {
                return "Noroeste";
            }
        case 2:
            if (degress >= 45 && degress < 67.5) {
                return "Este-noroeste";
            } else {
                return "Este";
            }
        case 3:
            if (degress >= 67.5 && degress < 90) {
                return "Este-sureste";
            } else {
                    return "Sureste";
            }
        case 4:
            if (degress >= 90 && degress < 112.5) {
                return "Sur-sureste";
            } else {
                    return "Sur";
            }  
        case 5:
            if (degress >= 112.5 && degress < 135) {
                return "Sur-suroeste";
            } else {
                return "Suroeste";
            }
        case 6:
            if (degress >= 135 && degress < 157.5) {
                return "Oeste-suroeste";
            } else {
                return "Oeste";
            }
        case 7:
            if (degress >= 157.5 && degress < 180) {
                return "Oeste-noroeste";
            } else {
                return "Noroeste";
            }
        case 8:
            if (degress >= 180 && degress < 202.5) {
                return "Norte-noroeste";
            } else {
                return "Norte";
            }
    }
}