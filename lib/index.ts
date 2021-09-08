import ask from './utils/request'

type i_ContructorParams = {
  url: string
  callback: (response: any) => void
}


class Scrappy {
  maxConnection: number = 1
  maxPage: number = 1
  params: i_ContructorParams
  constructor(params: i_ContructorParams) {
    this.params = params
  }
}

export default Scrappy
