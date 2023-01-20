import { Text, View, ScrollView } from 'react-native'

import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'
import { useNavigation } from '@react-navigation/native'

import { HabitDay, DAY_SIZE } from '../components/HabitDay'
import { Header } from '../components/Header'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateDatesFromYearBeginning()
const minumumSummaryDateSizes = 18 * 5
const ammountOfDaysToFill = minumumSummaryDateSizes - datesFromYearStart.length

export function Home() {
  const { navigate } = useNavigation()
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="flex-row mt-6 mb-2">
          {weekDays.map((weekDay, i) => (
            <Text key={`${weekDay}-${i}`} className="text-zinc-400 text-xl font-bold text-center mx-1" style={{ width: DAY_SIZE }}>
              {weekDay}
            </Text>
          ))}
        </View>

        <View className="flex-row flex-wrap">
          {datesFromYearStart.map(date => (
            <HabitDay key={date.toISOString()} onPress={() => navigate('habit', { date: date.toISOString() })} />
          ))}

          {ammountOfDaysToFill > 0 &&
            Array.from({ length: ammountOfDaysToFill }).map((_, index) => (
              <View key={index} className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40" style={{ width: DAY_SIZE, height: DAY_SIZE }} />
            ))}
        </View>
      </ScrollView>
    </View>
  )
}
