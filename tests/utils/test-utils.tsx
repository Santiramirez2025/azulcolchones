import { ReactElement, ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {}

export function renderWithProviders(
  ui: ReactElement,
  options: CustomRenderOptions = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return <>{children}</>
  }

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...options }),
  }
}

export * from '@testing-library/react'
export { renderWithProviders as render }
