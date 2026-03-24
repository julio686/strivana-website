// Web3Forms configuration
// Get your access key from: https://web3forms.com/

const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

export const isWeb3FormsConfigured = !!(accessKey?.trim() && accessKey !== 'your-web3forms-access-key-here')

export const WEB3FORMS_CONFIG = {
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: accessKey || '',
}

export interface Web3FormsResponse {
  success: boolean
  message: string
  data?: {
    name: string
    email: string
    message: string
    [key: string]: any
  }
}
