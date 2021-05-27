import Login from "./Login"
import * as jest from "jest";

describe('Login', () => {
  it('ログインフォームのテスト', () => {
    const props={
        guest: true,
        setIsGuest: null
    }

    // propsを受け取り mount テスト対象component生成
    const wrapper = jest.mount(<Login {...props} />)

    // { txt }にpropsで受け取った値が表示されているか確認
    jest.expect(wrapper.text()).toBe(props.txt)
  })

  it('clickイベントの確認', () => {
      const props = {a:"a"}

    // handleClickの監視
    const spyHandleClick = jest.spyOn(props, 'handleClick')

    // propsを受け取り mount テスト対象component生成
    const wrapper = jest.mount(<Button {...props} />)

    // clickイベント実行
    wrapper.find('button').simulate('click')

    // spyHandleClickが実行されたか確認
    jest.expect(spyHandleClick).toHaveBeenCalled()
  })
})