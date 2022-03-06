import React from 'react'
export * from './splitter/index'
export * from './desktop/index'
export * from './focus_highlighter/index'
export * from './sliding_panels/index'

export {
  ThemeProvider,
  Box,
  Flex,
  Text,
  Container,
  Heading,
  AspectRatio,
  Image,
  AspectImage,
  Label,
  Input,
  Select,
  Textarea,
  Radio,
  Checkbox,
  Slider,
  Button,
  Grid,
} from 'theme-ui'
import { useThemeUI } from 'theme-ui'
import { Box, Text, Spinner } from 'theme-ui'

export function useTheme() {
  const context = useThemeUI()
  return context.theme
}

export function ErrorComponent({ error }: { error: Error }) {
  return (
    <Box sx={{ flex: 1 }}>
      <Text>{error.message}</Text>
    </Box>
  )
}

export function LoadingComponent() {
  return (
    <Box sx={{ flex: 1 }}>
      <Spinner />
    </Box>
  )
}
