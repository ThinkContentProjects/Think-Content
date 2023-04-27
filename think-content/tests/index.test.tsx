import { render, screen } from '@testing-library/react'
import Home from '../src/pages/index'
import '@testing-library/jest-dom'
import { RecoilRoot } from 'recoil'

describe('Home', () => {
  it('renders a heading', () => {
    render( 
      <RecoilRoot>
          <Home/>
      </RecoilRoot>
    )

    // const heading = screen.getByRole('heading', {
    //   name: /welcome to next\.js!/i,
    // })

    // expect(heading).toBeInTheDocument()
  })
})