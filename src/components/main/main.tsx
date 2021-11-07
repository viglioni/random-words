import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core'
import { length, map, range, take } from 'ramda'
import React, { useEffect, useState } from 'react'
import { toccleSort, words } from '../../extra/words'
import { useStyles } from './main.style'

const Main = (): JSX.Element => {
  const [numberOfWords, setNumberOfWords] = useState(0)

  const [takenWords, setTakenWords] = useState<string[]>([])

  const reTakeWords = () => {
    const randomizedWords = toccleSort(words)
    setTakenWords(take(numberOfWords, randomizedWords))
  }

  useEffect(() => {
    reTakeWords()
  }, [numberOfWords])

  const classes = useStyles()

  const options = map(
    n => (
      <MenuItem value={n} key={n}>
        {n}
      </MenuItem>
    ),
    range(0, length(words) + 1),
  )

  const wordsComponent = map(
    w => (
      <Typography key={w} variant="h5">
        {w}
      </Typography>
    ),
    takenWords,
  )

  return (
    <Grid
      container
      className={classes.container}
      alignItems="center"
      direction="column"
    >
      <Grid
        item
        container
        justify="center"
        direction="column"
        alignItems="center"
        className={classes.main}
      >
        <Typography variant="h1"> Adjetivos </Typography>
        <Grid
          className={classes.selectGrid}
          item
          container
          direction="column"
          justifyContent="center"
        >
          <InputLabel id="number-selector"> Quantas palavras? </InputLabel>
          <Select
            labelId="number-selector"
            value={numberOfWords}
            onChange={e => setNumberOfWords((e.target?.value as number) || 0)}
          >
            {options}
          </Select>
          <Grid
            className={classes.button}
            item
            container
            justifyContent="center"
          >
            <Button variant="contained" onClick={reTakeWords}>
              Escolher outras!
            </Button>
          </Grid>
        </Grid>
        <Grid item container direction="column" className={classes.words}>
          {wordsComponent}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Main
