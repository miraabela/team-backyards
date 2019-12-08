

calc = ['minHour', 'minMin', 'maxHour', 'maxMin', 'interval']



pGroups = ['A','B','C','D','E','F','G','H','I','J','K','L', 'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

# write function to split string by spaces, save into array
labels = ['pressureGroup', 'min','max', 'minutes']


# min, max are strings in the format 0:00
def calcInterval(min, max):
    minSplit = min.split(':')
    maxSplit = max.split(':')
    minMinutes = (int(minSplit[0]) * 60) + int(minSplit[1])
    maxMinutes = (int(maxSplit[0]) * 60) + int(maxSplit[1])
    interval = maxMinutes - minMinutes
    return interval


def calcMinutes(max):
    maxSplit = max.split(':')
    maxMinutes = (int(maxSplit[0]) * 60) + int(maxSplit[1])
    return maxMinutes



def getTimes(key, value):
    currentPressureGroup = key[-1]
    mins = value[0].split(' ')
    maxs = value[1].split(' ')
    intervals = []
    for i in range(len(maxs)):
        #inter = calcInterval(mins[i],maxs[i])
        inter = calcMinutes(maxs[i])
        intervals.append(inter)
    return (currentPressureGroup, intervals)


## assign new pressure groups
## reverse array
newPressureGroup = ''

calced = {}



surfaceInterval = {
     "siA": ['0:00','3:00'],
     "siB": ['0:00 0:48', '0:47 3:48'],
     "siC": ['0:00 0:22 1:10', '0:21 1:09 4:10'],
     "siD": ['0:00 0:09 0:31 1:19','0:08 0:30 1:18 4:19'],
     "siE": ['0:00 0:08 0:17 0:39 1:28', '0:07 0:16 0:38 1:27 4:28'],
     "siF": ['0:00 0:08 0:16 0:25 0:47 1:35', '0:07 0:15 0:24 0:46 1:34 4:35'],
     "siG": ['0:00 0:07 0:14 0:23 0:32 0:54 1:42', '0:06 0:13 0:22 0:31 0:53 1:41 4:42' ],
     "siH": ['0:00 0:06 0:13 0:21 0:29 0:38 1:00 1:48', '0:05 0:12 0:20 0:28 0:37 0:59 1:47 4:48'],
     "siI": ['0:00 0:06 0:12 0:19 0:27 0:35 0:44 1:06 1:54', '0:05 0:11 0:18 0:26 0:34 0:43 1:05 1:53 4:54'],
     "siJ": ['0:00 0:06 0:12 0:18 0:25 0:32 0:41 0:50 1:12 2:00', '0:05 0:11 0:17 0:24 0:31 0:40 0:49 1:11 1:59 5:00'],
     "siK": ['0:00 0:05 0:11 0:17 0:23 0:30 0:38 0:46 0:55 1:17 2:05', '0:04 0:10 0:16 0:22 0:29 0:37 0:45 0:54 1:16 2:04 5:05'],
     "siL": ['0:00 0:05 0:10 0:16 0:22 0:28 0:35 0:43 0:51 1:00 1:22 2:10', '0:04 0:09 0:15 0:21 0:27 0:34 0:42 0:50 0:59 1:21 2:09 5:10'],
     "siM": ['0:00 0:05 0:10 0:15 0:20 0:26 0:33 0:40 0:47 0:56 1:05 1:26 2:15', '0:04 0:09 0:14 0:19 0:25 0:32 0:39 0:46 0:55 1:04 1:25 2:14 5:15'],
     "siN": ['0:00 0:04 0:09 0:14 0:19 0:25 0:31 0:37 0:44 0:52 1:00 1:09 1:31 2:19', '0:03 0:08 0:13 0:18 0:24 0:30 0:36 0:43 0:51 0:59 1:08 1:30 2:18 5:19'],
     "siO": ['0:00 0:04 0:09 0:13 0:18 0:24 0:29 0:35 0:42 0:48 0:56 1:04 1:13 1:35 2:24', '0:03 0:08 0:12 0:17 0:23 0:28 0:34 0:41 0:47 0:55 1:03 1:12 1:34 2:23 5:24'],
     "siP": ['0:00 0:04 0:08 0:13 0:17 0:22 0:28 0:33 0:39 0:46 0:52 1:00 1:08 1:17 1:39 2:28', '0:03 0:07 0:12 0:16 0:21 0:27 0:32 0:38 0:45 0:51 0:59 1:07 1:16 1:38 2:27 5:28'],
     "siQ": ['0:00 0:04 0:08 0:12 0:17 0:21 0:26 0:31 0:37 0:43 0:49 0:56 1:04 1:12 1:21 1:43 2:31', '0:03 0:07 0:11 0:16 0:20 0:25 0:30 0:36 0:42 0:48 0:55 1:03 1:11 1:20 1:42 2:30 5:31'],
     "siR": ['0:00 0:04 0:08 0:12 0:16 0:20 0:25 0:30 0:35 0:41 0:47 0:53 1:00 1:08 1:16 1:25 1:47 2:35', '0:03 0:07 0:11 0:15 0:19 0:24 0:29 0:34 0:40 0:46 0:52 0:59 1:07 1:15 1:24 1:46 2:34 5:35'],
     "siS": ['0:00 0:04 0:07 0:11 0:15 0:19 0:24 0:28 0:33 0:39 0:44 0:50 0:57 1:04 1:11 1:19 1:28 1:50 2:39', '0:03 0:06 0:10 0:14 0:18 0:23 0:27 0:32 0:38 0:43 0:49 0:56 1:03 1:10 1:18 1:27 1:49 2:38 5:39'],
     "siT": ['0:00 0:03 0:07 0:11 0:14 0:18 0:23 0:27 0:32 0:37 0:42 0:48 0:54 1:00 1:07 1:14 1:23 1:32 1:54 2:42', '0:02 0:06 0:10 0:13 0:17 0:22 0:26 0:31 0:36 0:41 0:47 0:53 0:59 1:06 1:13 1:22 1:31 1:53 2:41 5:42'],
     "siU": ['0:00 0:03 0:07 0:10 0:14 0:18 0:22 0:26 0:30 0:35 0:40 0:45 0:51 0:57 1:03 1:10 1:18 1:26 1:35 1:57 2:45', '0:02 0:06 0:09 0:13 0:17 0:21 0:25 0:29 0:34 0:39 0:44 0:50 0:56 1:02 1:09 1:17 1:25 1:34 1:56 2:44 5:45'],
     "siV": ['0:00 0:03 0:06 0:10 0:13 0:17 0:21 0:25 0:29 0:34 0:38 0:43 0:48 0:54 1:00 1:06 1:13 1:21 1:29 1:38 2:00 2:48', '0:02 0:05 0:09 0:12 0:16 0:20 0:24 0:28 0:33 0:37 0:42 0:47 0:53 0:59 1:05 1:12 1:20 1:28 1:37 1:59 2:47 5:48'],
     "siW": ['0:00 0:03 0:06 0:09 0:13 0:16 0:20 0:24 0:28 0:32 0:37 0:41 0:46 0:51 0:57 1:03 1:09 1:16 1:24 1:32 1:41 2:03 2:51', '0:02 0:05 0:08 0:12 0:15 0:19 0:23 0:27 0:31 0:36 0:40 0:45 0:50 0:56 1:02 1:08 1:15 1:23 1:31 1:40 2:02 2:50 5:51'],
     "siX": ['0:00 0:03 0:06 0:09 0:12 0:16 0:19 0:23 0:27 0:31 0:35 0:40 0:44 0:49 0:54 1:00 1:06 1:12 1:19 1:27 1:35 1:44 2:06 2:54', '0:02 0:05 0:08 0:11 0:15 0:18 0:22 0:26 0:30 0:34 0:39 0:43 0:48 0:53 0:59 1:05 1:11 1:18 1:26 1:34 1:43 2:05 2:53 5:54'],
     "siY": ['0:00 0:03 0:06 0:09 0:12 0:15 0:19 0:22 0:26 0:30 0:34 0:38 0:42 0:47 0:52 0:57 1:03 1:09 1:15 1:22 1:30 1:38 1:47 2:09 2:57', '0:02 0:05 0:08 0:11 0:14 0:18 0:21 0:25 0:29 0:33 0:37 0:41 0:46 0:51 0:56 1:02 1:08 1:14 1:21 1:29 1:37 1:46 2:08 2:56 5:57'],
     "siZ": ['0:00 0:03 0:06 0:09 0:12 0:15 0:18 0:21 0:25 0:29 0:32 0:36 0:41 0:45 0:50 0:55 1:00 1:06 1:12 1:18 1:25 1:32 1:41 1:50 2:12 3:00', '0:02 0:05 0:08 0:11 0:14 0:17 0:20 0:24 0:28 0:31 0:35 0:40 0:44 0:49 0:54 0:59 1:05 1:11 1:17 1:24 1:31 1:40 1:49 2:11 2:59 6:00']
 }



for (key,value) in surfaceInterval.items():
    cpg, inters = getTimes(key, value)
    calced[cpg] = inters

#for c in calced.items():
#    print(c)
    
#print(calced)


# RESULTS

# end pgroup = len(intervals) - 1 - index
currentPressureGroupSurfaceIntervals = {
'A': [180], 
'B': [47, 228], 
'C': [21, 69, 250], 
'D': [8, 30, 78, 259], 
'E': [7, 16, 38, 87, 268], 
'F': [7, 15, 24, 46, 94, 275], 
'G': [6, 13, 22, 31, 53, 101, 282], 
'H': [5, 12, 20, 28, 37, 59, 107, 288], 
'I': [5, 11, 18, 26, 34, 43, 65, 113, 294], 
'J': [5, 11, 17, 24, 31, 40, 49, 71, 119, 300], 
'K': [4, 10, 16, 22, 29, 37, 45, 54, 76, 124, 305], 
'L': [4, 9, 15, 21, 27, 34, 42, 50, 59, 81, 129, 310], 
'M': [4, 9, 14, 19, 25, 32, 39, 46, 55, 64, 85, 134, 315], 
'N': [3, 8, 13, 18, 24, 30, 36, 43, 51, 59, 68, 90, 138, 319], 
'O': [3, 8, 12, 17, 23, 28, 34, 41, 47, 55, 63, 72, 94, 143, 324], 
'P': [3, 7, 12, 16, 21, 27, 32, 38, 45, 51, 59, 67, 76, 98, 147, 328], 
'Q': [3, 7, 11, 16, 20, 25, 30, 36, 42, 48, 55, 63, 71, 80, 102, 150, 331], 
'R': [3, 7, 11, 15, 19, 24, 29, 34, 40, 46, 52, 59, 67, 75, 84, 106, 154, 335], 
'S': [3, 6, 10, 14, 18, 23, 27, 32, 38, 43, 49, 56, 63, 70, 78, 87, 109, 158, 339], 
'T': [2, 6, 10, 13, 17, 22, 26, 31, 36, 41, 47, 53, 59, 66, 73, 82, 91, 113, 161, 342], 
'U': [2, 6, 9, 13, 17, 21, 25, 29, 34, 39, 44, 50, 56, 62, 69, 77, 85, 94, 116, 164, 345], 
'V': [2, 5, 9, 12, 16, 20, 24, 28, 33, 37, 42, 47, 53, 59, 65, 72, 80, 88, 97, 119, 167, 348], 
'W': [2, 5, 8, 12, 15, 19, 23, 27, 31, 36, 40, 45, 50, 56, 62, 68, 75, 83, 91, 100, 122, 170, 351], 
'X': [2, 5, 8, 11, 15, 18, 22, 26, 30, 34, 39, 43, 48, 53, 59, 65, 71, 78, 86, 94, 103, 125, 173, 354], 
'Y': [2, 5, 8, 11, 14, 18, 21, 25, 29, 33, 37, 41, 46, 51, 56, 62, 68, 74, 81, 89, 97, 106, 128, 176, 357], 
'Z': [2, 5, 8, 11, 14, 17, 20, 24, 28, 31, 35, 40, 44, 49, 54, 59, 65, 71, 77, 84, 91, 100, 109, 131, 179, 360]}






#########################################














