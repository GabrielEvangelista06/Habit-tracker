import { useEffect, useState } from 'react'
import { View, ScrollView, Text, Alert } from 'react-native'
import { useRoute } from '@react-navigation/native'
import dayjs from 'dayjs'

import { api } from '../lib/axios'
import { generateProgressPercentage } from '../utils/generate-progress-percentage'

import { BackButton } from '../components/BackButton'
import { ProgressBar } from '../components/Progressbar'
import { Checkbox } from '../components/Checkbox'
import { Loading } from '../components/Loading'
import { HabitsEmpty } from '../components/HabitsEmpty'

interface Params {
  date: string
}

interface DayInfoProps {
  completed: string[]
  possibleHabits: {
    id: string
    title: string
  }[]
}

export function Habit() {
  const [loading, setLoading] = useState(true)
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
  const [completedHabits, setCompletedHabits] = useState<string[]>([])

  const route = useRoute()
  const { date } = route.params as Params

  const parsedDate = dayjs(date)
  const dayOfWeek = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('DD/MM')

  const habitsProgress = dayInfo?.possibleHabits?.length ? generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length) : 0

  async function fetchHabits() {
    try {
      setLoading(true)

      const response = await api.get('/day', { params: { date } })

      setDayInfo(response.data)
      setCompletedHabits(response.data.completedHabits)
    } catch (error) {
      console.error(error)
      Alert.alert('Ops', 'Não foi carregar as informações do hábitos')
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleHabit(habitId: string) {
    if (completedHabits.includes(habitId)) {
      setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId))
    } else {
      setCompletedHabits(prevState => [...prevState, habitId])
    }
  }

  useEffect(() => {
    fetchHabits()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-semibold lowercase">{dayOfWeek}</Text>

        <Text className="text-white font-extrabold text-3xl">{dayAndMonth}</Text>

        <ProgressBar progress={habitsProgress} />

        <View className="mt-6">
          {dayInfo?.possibleHabits ? (
            dayInfo?.possibleHabits.map(habit => (
              <Checkbox key={habit.id} title={habit.title} checked={completedHabits.includes(habit.id)} onPress={() => handleToggleHabit(habit.id)} />
            ))
          ) : (
            <HabitsEmpty />
          )}
        </View>
      </ScrollView>
    </View>
  )
}
