import React, { Component } from 'react'
import {
  StyleSheet, Text, View, TouchableOpacity
  } from 'react-native'
// import moment from 'moment'

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
  constructor(props) {
    super(props)
    this.state = {
      start: 0,
      now: 0,
      phases: [ ],
      button_label: 'Ascend',
      counter: 0, 
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
    const phase = ['Safety Stop', 'Ascend']
    const { phases, now, start, counter } = this.state
    const [firstPhase, ...other] = phases
    this.setState({
      phases: [0, firstPhase + now - start, ...other],
      start: now,
      now,
      counter: counter + 1,
      button_label: phase[counter],
    })
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

  render() {
    const { now, start, phases, button_label, counter } = this.state
    const timer = now - start
    return (
      <View style={styles.container}>
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
    borderColor: '#151515',
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