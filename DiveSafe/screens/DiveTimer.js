import React, { Component } from 'react'
import {
  StyleSheet, Text, View, TouchableOpacity
  } from 'react-native'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import { Text as UIText } from 'react-native-ui-kitten';


function Timer({ interval, style }) {
  const pad = (n) => n < 10 ? '0' + n : n
  const duration = moment.duration(interval)
  const centiseconds = Math.floor(duration.milliseconds() / 10)
  return (
    <View style={styles.timerContainer}>
      <Text style={style}>{pad(duration.minutes())}:</Text>
      <Text style={style}>{pad(duration.seconds())}:</Text>
      <Text style={style}>{pad(centiseconds)}</Text>
    </View>
  )
}

function RoundButton({ title, color, background, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[ styles.button, { backgroundColor: background }]}
    >
    <View style={styles.buttonBorder}>
      <Text style={[ styles.buttonTitle, { color }]}>{title}</Text>
     </View>
    </TouchableOpacity>
  )
}

// For keeping track of which phase the diver is in (Descend, Ascend, Safety Stop)
function DivePhase({ name, interval}) {
  const phaseStyle = [
    styles.phaseText,
  ]
  return (
    <View style={styles.phase}>
      <Text style={phaseStyle}>{name}</Text>
      <Timer style={[phaseStyle, styles.phaseTimer]} interval={interval}/>
    </View>
  )
}

// List of how long each phase of the dive took. Displayed below the timer.
function PhaseLogs({ phases, timer }) {
  const finishedPhases = phases.slice(1)
  const phaseLabel = ['Descent:   ', 'Ascent:   ', 'Safety Stop:   ', 'Ascent:   ']
  let min = Number.MAX_SAFE_INTEGER
  let max = Number.MIN_SAFE_INTEGER
  if (finishedPhases.length >= 2) {
    finishedPhases.forEach(phase => {
      if (phase < min) min = phase
      if (phase > max) max = phase
    })
  }
  return (
    <View style={styles.phaseView}>
      {phases.map((phase, index) => (
        <DivePhase
          name = {phaseLabel[phases.length-index-1]}
          key={phases.length - index}
          interval={index === 0 ? timer + phase : phase}
        />
      ))}
    </View>
  )
}

function ButtonsRow({ children }) {
  return (
    <View style={styles.buttonsRow}>{children}</View>
  )
}

export class DiveTimer extends React.Component {

  componentWillMount() {
    this.getData()
  }
  updateState = (data) => {
    this.setState(prevState => ({...prevState, data: {data}, isLoading: false}))
  }

  getData = async () => {
    try {
      data = await AsyncStorage.getItem('userData')
      newState = JSON.parse(data)
      this.updateState(newState)
    } catch (error) {
      console.log(error)
    }
  }


  constructor(props) {
    super(props)
    this.state = {
      data: {},
      isLoading: true,
      start: 0,
      now: 0,
      phases: [ ],
      button_label: 'Ascend',
      counter: 0, 
      safety_stop: false,
      plannedDepth: 0,
      plannedTime: 0,
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  start = () => {
    const now = new Date().getTime()
    this.setState({
      start: now,
      now,
      phases: [0],
    })
    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime()})
    }, 100)
  }

  /* When nextPhase button is pressed
   * New log of previous phase is created
   * Main timer resumes
   * Phase timer starts from 00:00:00
  */
  nextPhase = () => {
    console.log(this.state)
    const phase = ['Safety Stop', 'Ascend']
    const { phases, now, start, counter, safety_stop } = this.state
    const [firstPhase, ...other] = phases
    this.setState({
      phases: [0, firstPhase + now - start, ...other],
      start: now,
      now,
    })
    if (safety_stop) {
      this.setState({
        counter: counter + 1,
        button_label: phase[counter],
      })
    } else {
      this.setState({
        counter: 3,
        button_label: phase[2]
      })
    }
    this.resume()
  }

  stop = () => {
    clearInterval(this.timer)
    const { phases, now, start } = this.state
    const [firstPhase, ...other] = phases
    this.setState({
      phases: [firstPhase + now - start, ...other],
      start: 0,
      now: 0,
    })
  }

  resume = () => {
    const now = new Date().getTime()
    this.setState({
      start: now,
      now,
    })
    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime()})
    }, 100)
  }

  finish = async () => {
    try {
      totaltime = 0
      for (let i = 0; i < this.state.phases.length; i++) {
        totaltime += this.state.phases[i]
      }
      cd = {
        startingPG: '', 
        endingPG:  this.state.data.plannedDive.newPgroup, 
        plannedDepth: this.state.data.plannedDive.depth,
        plannedTime: this.state.data.plannedDive.time,
        surfacedTime: (new Date()).toISOString(),
        phases: [...this.state.phases],
        totalTime: totaltime,
        safety_stop: this.state.safety_stop,
        location: 'Honolulu',
      }
      this.state.data.diveHistory.append(cd)
      this.setState(prevState => ({...prevState, data: {
        ...prevState.data,
        currentDive: {cd}
      }}))
      AsyncStorage.mergeItem('userData', JSON.stringify(this.state.data))
    } catch (error) {
        console.log(error)
    }
    Actions.SingleDivePage()
  }
  render() {

    if (this.state.isLoading) {
      return <Text category='h2'>Loading...</Text>
  }
  
    const { now, start, phases, button_label, counter, safety_stop } = this.state
    const timer = now - start
    return (
      <View style={styles.container}>
        <UIText category='h6'>Planned Bottom Time:</UIText>
        {/* <UIText category='s1'> RETRIEVE BOTTOM TIME FROM PLANNEDDIVE </UIText> */}
        <UIText category='h6'>Planned Depth: </UIText>
        {/* <UIText category='s1'> RETRIEVE DEPTH FROM PLANNEDDIVE </UIText> */}
        <UIText category='h6'>Safety Stop: </UIText>
        {/* <UIText category='s1'> {this.state.data.plannedDive.safetystop ? 'Required at 5 meters for 3 minutes.' : 'Not Required'}</UIText> */}

        <Text category='label'>Timer</Text>
        <Timer
          interval={phases.reduce((total, curr) => total + curr, 0) + timer}
          style={styles.timer}
        />
        {/* Timer hasn't started, so only show 'Start' button */}
        {phases.length === 0 && (
          <ButtonsRow>
            <RoundButton
              title='Start'
              color='#FFFFFF'
              background='#00D49B'
              onPress={this.start}
            />
          </ButtonsRow>
        )}
        {/* After 'Start' button is pressed & timer is active, only 'Stop' button is shown */}
        {start > 0 && (
          <ButtonsRow>
            <RoundButton
              title='Stop'
              color='#FFFFFF'
              background='#D40000'
              onPress={this.stop}
            />
          </ButtonsRow>
        )}
        {/* Once timer is stopped, user has option to 'Resume' or to go onto the next phase of the dive */}
        {phases.length > 0 && start === 0 && counter < 3 && (
          <ButtonsRow>
            <RoundButton
              title='Resume'
              color='#FFFFFF'
              background='#00D494'
              onPress={this.resume}
            />
            <RoundButton
              title={button_label}
              color='#FFFFFF'
              background='#8B8B90'
              onPress={this.nextPhase}
            />
          </ButtonsRow>
        )}
        {/* User reaches last phase of dive, only 'Resume' button is shown */}
        {counter >= 3 && start === 0 && (
          <ButtonsRow>
            <RoundButton
              title='Resume'
              color='#FFFFFF'
              background='#00D494'
              onPress={this.resume}
            />
            <RoundButton
              title='Finish Dive'
              color='#FFFFFF'
              background='#3366FF'
              onPress={this.finish}
            />
          </ButtonsRow>
        )}
        <PhaseLogs phases={phases} timer={timer}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  timer: {
    color: '#000000',
    fontSize: 65,
    fontWeight: '200',
    width: 110,
    marginTop: 20,
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "flex-start",
  },
  buttonTitle: {
    fontSize: 18,
  },
  buttonsRow: {
    flexDirection: 'row-reverse',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  phaseText: {
    color: '#000000',
    fontSize: 18,
  },
  phaseTimer: {
    width: 30,
  },
  phase: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#d3d3db',
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  phaseView: {
    alignSelf: 'stretch',
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 40,
  }
})