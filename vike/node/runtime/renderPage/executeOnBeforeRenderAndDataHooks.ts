export { executeOnBeforeRenderAndDataHooks }

import { type PageContextExports } from '../../../shared/getPageFiles.js'
import { getHook } from '../../../shared/hooks/getHook.js'
import {
  preparePageContextForUserConsumptionServerSide,
  type PageContextForUserConsumptionServerSide
} from './preparePageContextForUserConsumptionServerSide.js'
import { executeHook } from '../utils.js'
import { assertOnBeforeRenderHookReturn } from '../../../shared/assertOnBeforeRenderHookReturn.js'
import { assertDataHookReturn } from '../../../shared/assertDataHookReturn.js'

async function executeOnBeforeRenderAndDataHooks(
  pageContext: {
    _pageId: string
    _pageContextAlreadyProvidedByOnPrerenderHook?: true
  } & PageContextExports &
    PageContextForUserConsumptionServerSide
): Promise<void> {
  if (pageContext._pageContextAlreadyProvidedByOnPrerenderHook) {
    return
  }
  const onBeforeRenderHook = getHook(pageContext, 'onBeforeRender')
  const dataHook = getHook(pageContext, 'data')
  if (!onBeforeRenderHook && !dataHook) {
    return
  }

  preparePageContextForUserConsumptionServerSide(pageContext)

  if (onBeforeRenderHook) {
    const hookResult = await executeHook(
      () => onBeforeRenderHook.hookFn(pageContext),
      'onBeforeRender',
      onBeforeRenderHook.hookFilePath
    )
    assertOnBeforeRenderHookReturn(hookResult, onBeforeRenderHook.hookFilePath)
    const pageContextFromHook = hookResult?.pageContext
    Object.assign(pageContext, pageContextFromHook)
  }

  if (dataHook) {
    const hookResult = await executeHook(() => dataHook.hookFn(pageContext), 'data', dataHook.hookFilePath)
    assertDataHookReturn(hookResult, dataHook.hookFilePath)
    const pageContextFromHook = {
      data: hookResult
    }
    Object.assign(pageContext, pageContextFromHook)
  }
}
