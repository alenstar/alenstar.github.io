+++
categories = ["y"]
date = "2017-06-15T10:10:08+08:00"
description = "duilib是开源DirectUI界面开发库， 可以方便的开发win32界面程序， 其基于XML界面设计方式将界面设计和程序逻辑解藕, 方便界面设计人员设计界面， 同时也提高了编码效率。"
tags = ["c/c++", "duilib"]
title = "DuiLib xml配置项"

+++

本文参考http://blog.csdn.net/wang03989/article/details/41577267
对部分不理解的地方添加自己的理解或者删除

------

DUILibxml配置项

Window 子节点属性   

> |--- Image 图片信息  
> |----- name string // 控件  
> |----- restype string // 资源类型 png，icon 等   
> |----- mask unsigned long  // 给不支持alpha通道的图片格式（如bmp）指定透明色  
> |  
> |--- Font 字体信息  
> |--- |--- id string  // 字体ID， 可被其它标签引用   
> |--- |--- name string  // 字体名， 微软雅黑， 宋体 等  
> |--- |--- size long  // 字体大小
> |--- |--- bold bool  //  设置粗体
> |--- |--- underline bool // 设置下划线 
> |--- |--- default bool // 设置为默认字体    
> |  
> |--- Default 默认属性  
> |--- |--- name string  // 属性名
> |--- |--- value string // 属性值， 值内双引号 “ 用 &quot; 代替  
> |--- |--- shared bool // 是否共享  

Window 根节点属性  

> |--- size    窗体初始化大小 SIZE(int cx, int cy)  
> |--- sizebox 窗体区域 RECT(long left, long top, long right,long bottom)  
> |--- caption 窗体标题栏区域 RECT(long left, long top, long right,long bottom)  
> |--- roundcorner 圆角大小 SIZE(int cx, int cy)  
> |--- mininfo 窗体最小大小 SIZE(int cx, int cy)  
> |--- maxinfo 窗体最大大小 SIZE(int cx, int cy)  
> |--- showdirty 窗体显示 bool [true|false]  
> |--- alpha 窗体透明度 int  
> |--- bktrans 背景是否支持透明 bool [true|false]  
> |--- disabledfontcolor 无效字体颜色 string #RRGGBBAA  
> |--- defaultfontcolor 默认字体颜色 string #RRGGBBAA  
> |--- linkfontcolor 链接正常字体色 string #RRGGBBAA  
> |--- linkhoverfontcolor链接悬停字体色 string #RRGGBBAA  
> |--- selectedcolor 字体被选后颜色 string #RRGGBBAA  

公共资源  
Image  

> |--- file/res string  // 设置Image资源位置， 可以是文件或者资源ID（只能选其一）  
> |--- restype string  // 设置资源类型（png,icon 等）， 在设置了res是有效  
> |--- dest RECT(long left, long top, long right,long bottom) // 贴图的目标位置  
> |--- source RECT(long left, long top, long right,long bottom) // 将要贴图的部分  
> |--- corner RECT(long left, long top, long right,long bottom) // 按照scale9方式绘制（九宫格）  
> |--- mask string #FFFFFFFF  // 给不支持alpha通道的图片格式（如bmp）指定透明色  
> |--- fade byte  // 设置图片绘制的透明度  
> |--- hole bool [true|false]  // 指定scale9绘制时要不要绘制中间部分  
> |--- xtiled bool [true|false]  // x轴是否拉伸  
> |--- ytiled bool [true|false]  // y轴是否拉伸   
> // 使用说明：  
> // aaa.jpg  
> 
```  
file='aaa.jpg' dest='0,0,0,0' source='0,0,0,0' corner='0,0,0,0'  
mask='#FF0000' fade='255' hole='false' xtiled='false' ytiled='false' 
```  
```  
res='102' restype='jpg' dest='0,0,0,0' source='0,0,0,0' corner='0,0,0,0'  
mask='#FF0000' fade='255' hole='false' xtiled='false' ytiled='false' 
```  


控件Control  

控件基类  
Control CControlUI  

> |--- pos RECT(long left, long top, long right,long bottom)  
> |--- relativepos (int nMoveXPercent, int nMoveYPercent,int nZoomXPercent,int nZoomYPercent)  
> |--- padding RECT(long left, long top, long right,long bottom)  
> |--- bkcolor/bkcolor1 string #RRGGBBAA  
> |--- bkcolor2 string #RRGGBBAA  
> |--- bkcolor3 string #RRGGBBAA  
> |--- bordercolor string #RRGGBBAA    
> |--- focusbordercolor string #RRGGBBAA  
> |--- bordersize int   
> |--- borderround SIZE(int x, int y)  
> |--- bkimage Image 背景图片属性  
> |--- width int  
> |--- height int  
> |--- minwidth int  
> |--- minheight int  
> |--- maxwidth int  
> |--- maxheight int  
> |--- name string  
> |--- text string  
> |--- tooltip string  
> |--- userdata string  
> |--- enabled bool [true|false]  
> |--- mouse bool [true|false]  
> |--- visible bool [true|false]  
> |--- float bool [true|false]  
> |--- shortcut TCHAR  
> |--- menu bool [true|false]  


容器  
Container CContainerUI  

> |--- inset RECT(long left, long top, long right,long bottom)  
> |--- mousechild bool [true|false]  
> |--- vscrollbar bool [true|false]  
> |--- hscrollbar bool [true|false]  
> |--- childpadding int  

布局管理器  

VerticalLayout CVerticalLayoutUI : public CContainerUI // 垂直放置控件    

> |--- sepheight int  
> |--- sepimm bool [true|false]  
> |--- CContainerUI::SetAttribute(pstrName, pstrValue)  

HorizontalLayout CHorizontalLayoutUI : public CContainerUI // 水平放置控件  

> |--- sepwidth int  
> |--- sepimm bool [true|false]  
> |--- CContainerUI::SetAttribute(pstrName, pstrValue)  

DialogLayout CDialogLayoutUI : public CContainerUI  

> |--- CContainerUI::SetAttribute(pstrName, pstrValue)  

TileLayout CTitleLayoutUI : public CContainerUI  

> |--- columns int  
> |--- CContainerUI::SetAttribute(pstrName, pstrValue)  

TabLayout CTabLayoutUI : public CContainerUI  

> |--- selectedid int  
> |--- CContainerUI::SetAttribute(pstrName, pstrValue)  


Edit CEditUI : public CLabelUI  //编辑框  

> |--- readonly bool [true|false] // 设置为只读  
> |--- password bool [true|false]  // 设置为密码框  
> |--- maxchar int  
> |--- normalimage Image 属性 // 通常状态图片   
> |--- hotimage Image 属性 // 鼠标悬停状态图片  
> |--- focusedimage Image 属性 // 焦点状态图片  
> |--- disabledimage Image 属性 // 禁用状态图片  
> |--- nativebkcolor string #RRGGBBAA  
> |--- CLabelUI::SetAttribute(pstrName, pstrValue)

List CListUI : public CVerticalLayoutUI, public IListUI // 列表  

> |--- header string bool [hidden|Show]  
> |--- headerbkimage string path  
> |--- scrollselect bool [true|false]  
> |--- multiexpanding bool [true|false]  
> |--- itemfont int Font列表的索引号  
> |--- itemalign string enum [left|center|right]  
> |--- itemendellipsis bool [true|false]  
> |--- itemtextpadding RECT(long left, long top, long right,long bottom)  
> |--- itemtextcolor string #RRGGBBAA  
> |--- itembkcolor string #RRGGBBAA  
> |--- itemimage string path  
> |--- itemselectedtextcolor string #RRGGBBAA  
> |--- itemselectedbkcolor string #RRGGBBAA  
> |--- itemselectedimage string path  
> |--- itemhottextcolor string #RRGGBBAA  
> |--- itemhotbkcolor string #RRGGBBAA  
> |--- itemhotimage Image 属性  
> |--- |--- file string path  
> |--- |--- corner RECT(long left, long top, long right,long bottom)  
> |--- itemdisabledtextcolor string #RRGGBBAA  
> |--- itemdisabledbkcolor string #RRGGBBAA  
> |--- itemdisabledimage Image 属性  
> |--- itemlinecolor string #RRGGBBAA  
> |--- itemshowhtml bool [true|false]  
> |--- CVerticalLayoutUI::SetAttribute(pstrName, pstrValue)  

ListHeaderItem CListHeaderItemUI : public CControlUI  

> |--- dragable bool [true|false]  
> |--- sepwidth int  
> |--- align string enum [left|center|right]  
> |--- itemshowhtml bool [true|false]  
> |--- endellipsis bool [true|false]  
> |--- font int Font列表的索引号  
> |--- textcolor string #RRGGBBAA  
> |--- textpadding RECT(long left, long top, long right,long bottom)  
> |--- showhtml bool [true|false]  
> |--- normalimage Image 属性  
> |--- hotimage Image 属性  
> |--- pushedimage Image 属性  
> |--- focusedimage Image 属性  
> |--- sepimage Image 属性  

CListElementUI : public CControlUI, public IListItemUI  

> |--- selected value 有此属性就选中  
> |--- CControlUI::SetAttribute(pstrName, pstrValue)  

ListExpandElement CListExpandElementUI : public CListTextElementUI  

> |--- expander RECT(long left, long top, long right,long bottom)  
> |--- hideself bool [true|false]  
> |--- selected bool  
> |--- CListTextElementUI::SetAttribute(pstrName, pstrValue)  

ListContainerElement CListContainerElementUI List容器  

> |--- selected value 有此属性就选中  

ListHeader CListHeaderUI // 列表头 

CListLabelElementUI : public CListElementUI  
ListTextElement CListTextElementUI : public CListLabelElementUI // 列表元素  

Label CLabelUI : public CControlUI // 标签  

> |--- align string enum [left|center|right]  
> |--- endellipsis bool [true|false]  
> |--- font int Font列表的索引号  
> |--- textcolor string #RRGGBBAA  
> |--- disabledtextcolor string #RRGGBBAA  
> |--- textpadding RECT(long left, long top, long right,long bottom)  
> |--- showhtml bool [true|false]  
> |--- CControlUI::SetAttribute( pstrName, pstrValue )  


Text CTextUI : public CLabelUI // 文本框  

Combo CComboUI : public CContainerUI, public IListOwnerUI // 下拉框   

> |--- textpadding RECT(long left, long top, long right,long bottom)  
> |--- normalimage Image 属性  
> |--- hotimage Image 属性  
> |--- pushedimage Image 属性  
> |--- focusedimage Image 属性  
> |--- disabledimage Image 属性  
> |--- dropbox string   
> |--- itemfont int Font列表的索引号  
> |--- itemalign string enum [left|center|right]  
> |--- itemtextpadding RECT(long left, long top, long right,long bottom)  
> |--- itemtextcolor string #RRGGBBAA  
> |--- itembkcolor string #RRGGBBAA  
> |--- itemimage Image 属性  
> |--- itemselectedtextcolor string #RRGGBBAA  
> |--- itemselectedimage Image 属性  
> |--- itemhottextcolor string #RRGGBBAA  
> |--- itemhotbkcolor string #RRGGBBAA  
> |--- itemhotimage Image 属性  
> |--- itemdisabledtextcolor string #RRGGBBAA  
> |--- itemdisabledbkcolor string #RRGGBBAA  
> |--- itemdisabledimage Image 属性  
> |--- itemlinecolor string #RRGGBBAA  
> |--- itemshowhtml bool [true|false]  
> |--- CContainerUI::SetAttribute(pstrName, pstrValue)  

Button CButtonUI : public CLabelUI // 按钮  

> |--- normalimage Image 属性  
> |--- hotimage Image 属性  
> |--- pushedimage Image 属性  
> |--- focusedimage Image 属性    
> |--- disabledimage Image 属性  
> |--- hottextcolor string #RRGGBBAA  
> |--- pushedtextcolor string #RRGGBBAA  
> |--- focusedtextcolor string #RRGGBBAA  
> |--- CLabelUI::SetAttribute(pstrName, pstrValue)  

Option COptionUI : public CButtonUI // 单选框  

> |--- group string  
> |--- selected bool [true|false]  
> |--- selectedimage Image 属性  
> |--- foreimage Image 属性  
> |--- selectedtextcolor string #RRGGBBAA  
> |--- CButtonUI::SetAttribute(pstrName, pstrValue)  

Progress CProgressUI : public CLabelUI // 进度条  

> |--- fgimage Image 属性  
> |--- hor bool  
> |--- min int  
> |--- max int  
> |--- value int  
> |--- CLabelUI::SetAttribute(pstrName, pstrValue)  

Slider CSliderUI : public CProgressUI // 滑动器   

> |--- thumbimage Image 属性  
> |--- thumbhotimage Image 属性  
> |--- thumbpushedimage Image 属性  
> |--- thumbsize SIZE(int x, int y)  
> |--- step int  
> |--- CProgressUI::SetAttribute(pstrName, pstrValue) 

RichEdit CRichEditUI : public CContainerUI, public IMessageFilterUI // 富文本编辑框  

> |--- vscrollbar bool [true|false]   
> |--- autovscroll bool [true|false]  
> |--- hscrollbar bool [true|false]  
> |--- autohscroll bool [true|false]  
> |--- wanttab bool [true|false]  
> |--- wantreturn bool [true|false]  
> |--- wantctrlreturn bool [true|false]  
> |--- rich bool [true|false]  
> |--- multiline bool [false|true]  
> |--- readonly bool [true|false]  
> |--- numberonly bool [true|false]  
> |--- password bool [true|false]  
> |--- align string enum [left|center|right]  
> |--- font int Font列表的索引号  
> |--- textcolor string #RRGGBBAA  
> |--- CContainerUI::SetAttribute(pstrName, pstrValue) 


ActiveX CActiveXUI : public CControlUI // ActiveX控件（可嵌入IE）  

> |--- clsid string  
> |--- modulename string  
> |--- delaycreate bool [true|false]  
> |--- CControlUI::SetAttribute(pstrName, pstrValue)  
 
ScrollBar CScrollBarUI : public CControlUI // 滚动条   

> |--- button1normalimage Image 属性  
> |--- button1hotimage Image 属性  
> |--- button1pushedimage Image 属性  
> |--- button1disabledimage Image 属性  
> |--- button2normalimage Image 属性  
> |--- button2hotimage Image 属性  
> |--- button2pushedimage Image 属性  
> |--- button2disabledimage Image 属性  
> |--- thumbnormalimage Image 属性  
> |--- thumbhotimage Image 属性  
> |--- thumbpushedimage Image 属性  
> |--- thumbdisabledimage Image 属性  
> |--- railnormalimage Image 属性  
> |--- railhotimage Image 属性  
> |--- railpushedimage Image 属性  
> |--- raildisabledimage Image 属性  
> |--- bknormalimage Image 属性  
> |--- bkhotimage Image 属性  
> |--- bkpushedimage Image 属性  
> |--- bkdisabledimage Image 属性  
> |--- hor bool [true|false]  
> |--- linesize int  
> |--- range int  
> |--- value int  
> |--- showbutton1 bool [true|false]  
> |--- showbutton2 bool [true|false]  
> |--- CControlUI::SetAttribute(pstrName, pstrValue)  


控件的通用属性  
stretch STRETCHMODE  

> |--- move_x  
> |--- move_y  
> |--- move_xy   
> |--- size_x   
> |--- size_y  
> |--- size_xy  
> |--- group  
> |--- line  


duilib支持部分html标签， 如：

```  
Bold: <b>text</b>  <!-- 粗体 -->
Color: <c #xxxxxx>text</c>  <!-- 应用颜色（十六进制）到text上 -->
Font: <f x>text</f>  <!-- 应用字体（x是字体ID）到text上 --> 
Italic: <i>text</i>  <!-- 斜体 --> 
Link: <a x>text</a>  <!-- 连接标签（x是连接地址 or 程序 app:notepad） -->
NewLine <n>  <!-- 新行 -->
Paragraph: <p x>text</p>  <!-- 段落 -->
Raw Text: <r>text</r> <!-- 原始文本 -->
Selected: <s>text</s> <!-- 选中状态的文本 -->
Underline: <u>text</u> <!-- 带下划线的文本 -->
```

示例  

```  
<?xml version="1.0" encoding="utf-8"?>
<Window caption="0,0,0,36" roundcorner="5,5" size="300,400" sizebox="6,6,6,6" mininfo="80,60">
  <Font id="0" name="微软雅黑" size="12" bold="false" default="true" shared="true" />
  <Font id="1" name="微软雅黑" size="12" bold="true" shared="true" />  
  <Default name="Combo" value="normalimage=&quot;res='118' restype='png' source='0,0,100,22' corner='2,2,20,2'&quot; hotimage=&quot;res='118' restype='png' source='0,22,100,44' corner='2,2,22,2'&quot; pushedimage=&quot;res='118' restype='png' source='0,44,100,66' corner='2,2,22,2'&quot;" />
  <Default name="VScrollBar" value="thumbcolor=&quot;#FFFF0000&quot;" shared="true" />
  <VerticalLayout bkcolor="#FFFFFFFF" bordersize="2" bordercolor="#FF0934DA">
    <HorizontalLayout name="header" height="36" bkcolor="#FF4775CC">
      <HorizontalLayout>
        <Control width="10"/>
        <Label name="apptitle" text="标题" font="1" textcolor="#FFFFFFFF" />
      </HorizontalLayout>
      <HorizontalLayout height="25" width="96">
        <Button name="minbtn" tooltip="最小化" height="18" width="26" normalimage="res='103' restype='png'" hotimage="res='104' restype='png'" pushedimage="res='105' restype='png'"/>
        <Button name="maxbtn" tooltip="最大化" height="18" width="25" normalimage="res='106' restype='png'" hotimage="res='107' restype='png'" pushedimage="res='108' restype='png'"/>
        <Button name="restorebtn" visible="false" tooltip="恢复" height="18" width="25" normalimage="res='109' restype='png'" hotimage="res='110' restype='png'" pushedimage="res='111' restype='png'"/>
        <Button name="closebtn" tooltip="关闭" height="18" width="43" normalimage="res='112' restype='png'" hotimage="res='113' restype='png'" pushedimage="res='114' restype='png'"/>
      </HorizontalLayout>
    </HorizontalLayout>
    <VerticalLayout name="body" padding="2,0,2,2">
      <HorizontalLayout padding="10,10,10,10">
        <VerticalLayout inset="8,4,2,2" width="80">
          <Label text="标签:" textcolor="#000000" font="1"></Label>
        </VerticalLayout>
        <VerticalLayout inset="8,4,2,2" width="80">
          <Option name="radio" text="单选框" height="23" textpadding="20,0,0,0" align="left"  normalimage="res='127' restype='png' dest='0,5,15,20'" hotimage="res='128' restype='png' dest='0,5,15,20'" selectedimage="res='129' restype='png' dest='0,5,15,20'" width="60"/>
        </VerticalLayout>
      </HorizontalLayout>
      <HorizontalLayout padding="10,10,10,10">
        <VerticalLayout inset="8,4,2,2" width="80">
          <Text text="文本框" textcolor="#000000" font="1"></Text>
        </VerticalLayout>
        <VerticalLayout>
          <Edit height="23" text="编辑框" bordercolor="#C6CFD8" name="input" bkimage="res='139' source='0,0,258,23' corner='1,1,1,1' restype='png'"/>
        </VerticalLayout>
      </HorizontalLayout>
      <HorizontalLayout padding="10,10,10,10">
        <VerticalLayout inset="8,4,2,2" width="80">
          <Text text="密码:" textcolor="#000000" font="1"></Text>
        </VerticalLayout>
        <VerticalLayout>
          <Edit height="23" password="true" text="密码框" bordercolor="#C6CFD8" name="input" bkimage="res='139' source='0,0,258,23' corner='1,1,1,1' restype='png'"/>
        </VerticalLayout>
      </HorizontalLayout>
      <HorizontalLayout padding="10,10,10,10">
        <VerticalLayout inset="8,4,2,2" width="80">
          <Label />
          <Button name="btn" text="按钮" height="23" width="64" normalimage="res='115' restype='png'" hotimage="res='116' restype='png'" pushedimage="res='117' restype='png'"/>
        </VerticalLayout>
      </HorizontalLayout>
    </VerticalLayout>
  </VerticalLayout>
</Window>
```  

------

基本使用   

```  
#pragma once
#define WIN32_LEAN_AND_MEAN	
#define _CRT_SECURE_NO_DEPRECATE
#include <windows.h>
#include <objbase.h>
#include "..\DuiLib\UIlib.h"
using namespace DuiLib;
#ifdef _DEBUG
#   ifdef _UNICODE
#       pragma comment(lib, "..\\bin\\DuiLib_ud.lib")
#   else
#       pragma comment(lib, "..\\bin\\DuiLib_d.lib")
#   endif
#else
#   ifdef _UNICODE
#       pragma comment(lib, "..\\bin\\DuiLib_u.lib")
#   else
#       pragma comment(lib, "..\\bin\\DuiLib.lib")
#   endif
#endif
// 窗口实例及消息响应部分
class CFrameWindowWnd : public CWindowWnd, public INotifyUI
{
public:
    CFrameWindowWnd() { };
    LPCTSTR GetWindowClassName() const { 
		return _T("UIMainFrame"); 
	};
    UINT GetClassStyle() const { 
		return UI_CLASSSTYLE_FRAME | CS_DBLCLKS; 
	};
    void OnFinalMessage(HWND /*hWnd*/) { 
		delete this; 
	};
    void Notify(TNotifyUI& msg) // 事件处理  
    {
        if( msg.sType == _T("click") ) {
            if( msg.pSender->GetName() == _T("closebtn") ) {
                Close();
            }
        }
    }
    LRESULT HandleMessage(UINT uMsg, WPARAM wParam, LPARAM lParam)
    {
        if( uMsg == WM_CREATE ) {
            m_pm.Init(m_hWnd);
            CControlUI *pButton = new CButtonUI;
            pButton->SetName(_T("closebtn"));
            pButton->SetBkColor(0xFFFF0000);
            m_pm.AttachDialog(pButton);
            m_pm.AddNotifier(this);
            return 0;
        }
        else if( uMsg == WM_DESTROY ) {
            ::PostQuitMessage(0);
        }
        LRESULT lRes = 0;
        if( m_pm.MessageHandler(uMsg, wParam, lParam, lRes) ) 
			return lRes;
        return CWindowWnd::HandleMessage(uMsg, wParam, lParam);
    }
public:
    CPaintManagerUI m_pm;
};
// 程序入口及Duilib初始化部分
int APIENTRY WinMain(HINSTANCE hInstance, 
	HINSTANCE /*hPrevInstance*/, 
	LPSTR /*lpCmdLine*/, int nCmdShow)
{
    CPaintManagerUI::SetInstance(hInstance);
    CPaintManagerUI::SetResourcePath(CPaintManagerUI::GetInstancePath());
    CFrameWindowWnd* pFrame = new CFrameWindowWnd();
    if( pFrame == NULL ) return 0;
    pFrame->Create(NULL, _T("测试"), UI_WNDSTYLE_FRAME, WS_EX_WINDOWEDGE);
    pFrame->ShowWindow(true);
    CPaintManagerUI::MessageLoop();
    return 0;
}
```  

加载XML界面  

```  
LRESULT HandleMessage(UINT uMsg, WPARAM wParam, LPARAM lParam)
{
	if( uMsg == WM_CREATE ) {
	    m_pm.Init(m_hWnd);
	    CDialogBuilder builder;
	    CControlUI* pRoot = builder.Create(_T("test1.xml"), 
				(UINT)0, NULL, &m_pm);
	    ASSERT(pRoot && "Failed to parse XML");
	    m_pm.AttachDialog(pRoot);
	    m_pm.AddNotifier(this);
	    return 0;
	}
	else if( uMsg == WM_DESTROY ) {
	    ::PostQuitMessage(0);
	}
	else if( uMsg == WM_NCACTIVATE ) {
	    if( !::IsIconic(m_hWnd) ) {
	        return (wParam == 0) ? TRUE : FALSE;
	    }
	}
	else if( uMsg == WM_NCCALCSIZE ) {
	    return 0;
	}
	else if( uMsg == WM_NCPAINT ) {
	    return 0;
	}
	LRESULT lRes = 0;
	if( m_pm.MessageHandler(uMsg, wParam, lParam, lRes) ) 
			return lRes;
	return CWindowWnd::HandleMessage(uMsg, wParam, lParam);
}
```  

事件处理  
duilib支持两种事件处理方式：  

1. 实现INotifyUI接口  

```  
class CLoginFrameWnd : public CWindowWnd, public INotifyUI
{
public:
	// ……
    void Notify(TNotifyUI& msg)
    {
        if( msg.sType == _T("click") ) {
            if( msg.pSender->GetName() == _T("closebtn") ) { 
				PostQuitMessage(0); 
				return; 
			}
            else if( msg.pSender->GetName() == _T("loginBtn") ) { 
				Close(); 
				return; 
			}
        }
        else if( msg.sType == _T("itemselect") ) {
            if( msg.pSender->GetName() == _T("accountcombo") ) {
                CEditUI* pAccountEdit = static_cast<CEditUI*>(m_pm.FindControl(_T("accountedit")));
                if( pAccountEdit ) 
					pAccountEdit->SetText(msg.pSender->GetText());
            }
        }
	}
}
```  

2. 代理机制  

```  
class CLoginFrameWnd : public CWindowWnd, public INotifyUI
{
public:
	// ……
	bool OnAlphaChanged(void* param) {
        	TNotifyUI* pMsg = (TNotifyUI*)param;
        	if( pMsg->sType == _T("valuechanged") ) {
            m_pm.SetTransparent((static_cast<CSliderUI*>(pMsg->pSender))->GetValue());
        	}
        	return true;
	}
	void OnPrepare() 
    	{
        	CSliderUI* pSilder = static_cast<CSliderUI*>(m_pm.FindControl(_T("alpha_controlor")));
        	if( pSilder ) 
			pSilder->OnNotify += MakeDelegate(this, &CFrameWindowWnd::OnAlphaChanged);
    }
}
// OnPrepare函数需要在控件创建完成之后调用。
```  
   
duilib支持从外部加载资源，也支持windows的res资源，还可以动态加载皮肤。  
外部资源使用zip打包即可。  
在WinMain函数中CPaintManagerUI::SetInstance(hInstance)的后面加入CPaintManagerUI::SetResourceZip(_T("xxx.zip"))，如   

```  
int APIENTRY WinMain(HINSTANCE hInstance, 
	HINSTANCE /*hPrevInstance*/, 
	LPSTR /*lpCmdLine*/, int nCmdShow)
{
    CManager::SetInstance(hInstance);
	CManager::SetResourcePath(CManager::GetInstancePath());
	CPaintManagerUI::SetResourceZip(_T("xxx.zip"));
	// ……

	return 0;
}
```  

动态换肤  

```   
CPaintManagerUI::SetResourceZip(_T("skin2.zip")); // 或者skin1.zip
CPaintManagerUI::ReloadSkin();
```  
