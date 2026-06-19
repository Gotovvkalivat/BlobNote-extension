import type { Template } from '@/types'

export type ScenarioPresetId = 'support' | 'accounting' | 'sales'

export type ScenarioPresetTemplate = Pick<Template, 'title' | 'text' | 'tag' | 'color' | 'favorite'>

export type ScenarioPreset = {
  id: ScenarioPresetId
  labelKey: string
  templates: ScenarioPresetTemplate[]
}

export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: 'support',
    labelKey: 'supportPreset',
    templates: [
      {
        title: 'Приветствие',
        tag: 'Поддержка',
        favorite: true,
        color: 'blue',
        text: 'Здравствуйте! Меня зовут {{agent_name}}. Уже смотрю ваш вопрос и скоро вернусь с ответом.',
      },
      {
        title: 'Уточнение данных',
        tag: 'Поддержка',
        favorite: true,
        color: 'amber',
        text: 'Подскажите, пожалуйста, номер заказа и телефон, который был указан при оформлении. Так я быстрее найду информацию.',
      },
      {
        title: 'Пауза на проверку',
        tag: 'Поддержка',
        favorite: false,
        color: 'slate',
        text: 'Спасибо, взял(а) в работу. Мне понадобится несколько минут, чтобы все проверить.',
      },
      {
        title: 'Решение найдено',
        tag: 'Поддержка',
        favorite: false,
        color: 'green',
        text: 'Нашел(ла) решение. Сейчас кратко опишу, что нужно сделать дальше: ',
      },
      {
        title: 'Завершение',
        tag: 'Поддержка',
        favorite: false,
        color: 'green',
        text: 'Рад(а), что удалось помочь. Если появятся еще вопросы, напишите нам в любое время.',
      },
    ],
  },
  {
    id: 'accounting',
    labelKey: 'accountingPreset',
    templates: [
      {
        title: 'Запрос реквизитов',
        tag: 'Бухгалтерия',
        favorite: true,
        color: 'amber',
        text: 'Пришлите, пожалуйста, реквизиты организации: ИНН, КПП, юридический адрес и электронную почту для документов.',
      },
      {
        title: 'Счет отправлен',
        tag: 'Бухгалтерия',
        favorite: true,
        color: 'blue',
        text: 'Счет отправили. Проверьте, пожалуйста, данные и напишите, если нужно что-то исправить.',
      },
      {
        title: 'Оплата получена',
        tag: 'Бухгалтерия',
        favorite: false,
        color: 'green',
        text: 'Оплату получили, спасибо. Передаем заказ в дальнейшую работу.',
      },
      {
        title: 'Закрывающие документы',
        tag: 'Бухгалтерия',
        favorite: false,
        color: 'slate',
        text: 'Закрывающие документы подготовим и отправим после завершения услуги.',
      },
    ],
  },
  {
    id: 'sales',
    labelKey: 'salesPreset',
    templates: [
      {
        title: 'Уточнение потребности',
        tag: 'Продажи',
        favorite: true,
        color: 'blue',
        text: 'Подскажите, пожалуйста, какую задачу хотите решить и какой результат для вас самый важный?',
      },
      {
        title: 'Предложение',
        tag: 'Продажи',
        favorite: true,
        color: 'green',
        text: 'По вашему запросу подойдет такой вариант: ',
      },
      {
        title: 'Follow-up',
        tag: 'Продажи',
        favorite: false,
        color: 'amber',
        text: 'Возвращаюсь к нашему обсуждению. Актуально ли еще рассмотреть предложение?',
      },
      {
        title: 'Передача менеджеру',
        tag: 'Продажи',
        favorite: false,
        color: 'slate',
        text: 'Передам информацию менеджеру. Он свяжется с вами и поможет с деталями.',
      },
    ],
  },
]
