import React, { useState } from 'react'
import './style.scss'

const SwitchTabs = ({ data, onTabChange }) => {
    const [selectedTab, setSelectedTab] = useState(0);  // I will pass the index of Tab to show on screen e.g "day"
    const [left, setLeft] = useState(0); // on tab change Blurry effect is added by this state

    const activeTab = (tab, index) => {
        setLeft(index * 100);
        //console.log(index * 100);
        setTimeout(() => {
            setSelectedTab(index);
        }, 300);
        onTabChange(tab, index);
    }
    return (
        <div className='switchingTabs'>
            <div className="tabItems">
                {data.map((tab, index) => (
                    <span
                        key={index} className={`tabItem ${index} ${selectedTab === index ? "active" : ""}`}
                        onClick={() => activeTab(tab, index)}
                    >
                        {tab}
                    </span>
                ))}
                <span className="movingBg" style={{ left: left }} />
            </div>
        </div>
    )
}

export default SwitchTabs