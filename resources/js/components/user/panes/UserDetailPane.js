import React from 'react';

export default class UserDetailPane extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            'is_loading':false,
        }
    }
    
    
    
    render(){
    return (
        <div className="w-full h-full bg-white">
            <div className="pane-share">
                <div className="h-auto w-full bg-pink-900">{/*name, tourokunitizi, syousaikomennto*/}
                    <div className="box-border flex flex-row p-4 bg-pink-200 border-4 border-purple-900">
                        <div className="w-1/2 flex flex-row justify-around">
                            <div>User Name: </div>
                            <div>{this.props.user_data.name}</div>
                        </div>
                        <div className="flex flex-row w-1/2 justify-left bg-pink-800">
                            <div>参加日時: </div>
                            <div>{this.props.user_data.created_at.replace(/\..*$/, '').replace(/[T]/, ' ')}</div>
                        </div>
                    </div>
                    <div className="box-border border-4 border-purple-200 p-4">
                        <div>ユーザ説明:</div>
                        <div className="box-border border-4 border-purple-400 p-4">
                            <p>{this.props.user_data.description==null?"あｋｐ０きｄｃぉあｍふぁどｊ＠おえｊ０９う０ｄｊｃｌｓｍｄｆｌｍ：」ｆｋｊうぇふぃ＾えいｆ０うぇふぉｓｄｊ：ｌｍｃｌ：ｍｄｓふぉじゅうぇｆじょｆｐ「ｋｗｄ０くぃだおあｌｍｃｌ：あｄｊもあｐｊｄ０あいふぁｊふぁ":this.props.user_data.description}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-row justify-between bg-red-300">{/*toukousakuhinn*/}
                    <div><p>kokonitoukousakuhinn</p></div>
                </div>
                <div className="w-full flex flex-row justify-between bg-red-500">{/*okiniiri*/}
                    <div><p>kokoniokiniiri</p></div>
                </div>
            </div>
        </div>
        );
    }
    
}