import React from 'react';

import './icons.pcss';

export const Icons = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
            <symbol id="pause" viewBox="0 0 24 24">
                <g fill="none" fillRule="evenodd" stroke="#888" transform="translate(1 1)">
                    <path strokeLinecap="square" strokeWidth="1.2" d="M9 7v8M13 7v8" />
                    <circle cx="11" cy="11" r="11" />
                </g>
            </symbol>

            <symbol id="start" viewBox="0 0 24 24">
                <g fill="none" fillRule="evenodd" stroke="#1E1E1E" opacity=".5" transform="translate(1 1)">
                    <path strokeLinecap="square" strokeWidth="1.2" d="M8 7v8l7.435-4z" />
                    <circle cx="11" cy="11" r="11" />
                </g>
            </symbol>

            <symbol id="settings" viewBox="0 0 22 22">
                <g fill="none" fillRule="evenodd" opacity=".5">
                    <path d="M-1-1h24v24H-1z" />
                    <path stroke="#1E1E1E" strokeWidth="1.2" d="M10.145 21.4h1.71c.181-.475.368-1.023.551-1.639.144-.485.52-.866 1.004-1.016.47-.147.926-.336 1.361-.565a1.517 1.517 0 011.43.008 22.81 22.81 0 001.549.77l1.209-1.209a22.65 22.65 0 00-.77-1.549 1.517 1.517 0 01-.008-1.43c.229-.435.418-.891.564-1.361.15-.483.532-.86 1.017-1.004.616-.183 1.166-.37 1.638-.55v-1.71a22.738 22.738 0 00-1.639-.552 1.517 1.517 0 01-1.016-1.003 8.075 8.075 0 00-.565-1.362 1.517 1.517 0 01.008-1.43c.307-.565.562-1.085.77-1.548L17.75 3.04c-.465.208-.984.463-1.55.77a1.517 1.517 0 01-1.429.008 8.074 8.074 0 00-1.361-.564 1.517 1.517 0 01-1.004-1.017A22.794 22.794 0 0011.855.6h-1.71c-.182.48-.366 1.017-.547 1.62-.14.494-.52.883-1.009 1.035-.47.147-.926.336-1.362.565a1.517 1.517 0 01-1.43-.009 22.756 22.756 0 00-1.547-.769L3.04 4.25c.208.465.463.984.77 1.55.241.445.244.98.008 1.429-.229.436-.418.891-.564 1.361-.15.484-.532.86-1.017 1.004-.616.183-1.164.37-1.638.551v1.71c.476.182 1.01.364 1.607.542.513.14.915.539 1.055 1.034.144.457.327.9.542 1.31.26.467.254 1.036-.005 1.482-.301.557-.553 1.07-.757 1.527l1.209 1.21a22.65 22.65 0 001.548-.769c.221-.12.47-.184.722-.185h0c.247 0 .49.06.708.175.436.229.891.418 1.361.564.484.15.86.532 1.004 1.017.183.616.37 1.166.551 1.638zM11 7.4h0a3.6 3.6 0 110 7.2 3.6 3.6 0 010-7.2z" />
                </g>
            </symbol>

            <symbol id="logo" viewBox="0 0 160 35">
                <g fill="none" fillRule="evenodd">
                    <path fill="#232323" d="M125.471 24.653l-1.217-3.04h-6.06l-1.15 3.04h-4.115l6.57-15.487h3.672l6.503 15.487h-4.203zM121.268 13.3l-1.99 5.316h3.937l-1.947-5.316zM112.31 18.813c0 .933-.159 1.782-.476 2.548a5.538 5.538 0 01-1.36 1.969c-.59.547-1.302.973-2.135 1.28-.833.306-1.758.459-2.776.459-1.032 0-1.961-.153-2.787-.46-.826-.306-1.526-.732-2.101-1.28a5.552 5.552 0 01-1.328-1.968c-.31-.766-.464-1.615-.464-2.549V9.166h3.76v9.34c0 .423.056.824.166 1.203.11.38.28.719.509 1.018.229.299.53.535.907.71.376.176.83.263 1.36.263.531 0 .985-.087 1.36-.262.377-.176.683-.412.919-.711.236-.3.405-.638.508-1.018.104-.379.155-.78.155-1.203v-9.34h3.783v9.646zM96.789 23.712c-.767.394-1.663.715-2.688.963-1.025.248-2.142.372-3.35.372-1.254 0-2.408-.197-3.463-.59-1.054-.395-1.96-.949-2.72-1.663a7.578 7.578 0 01-1.78-2.57c-.429-1-.642-2.111-.642-3.337 0-1.24.217-2.362.652-3.368a7.493 7.493 0 011.803-2.57 8 8 0 012.699-1.63c1.032-.38 2.145-.569 3.34-.569 1.238 0 2.389.186 3.45.558 1.062.372 1.925.871 2.588 1.498l-2.389 2.69c-.368-.422-.855-.768-1.46-1.038-.604-.27-1.29-.405-2.057-.405-.663 0-1.275.12-1.836.361-.56.24-1.047.576-1.46 1.006a4.56 4.56 0 00-.962 1.532 5.32 5.32 0 00-.343 1.935c0 .715.104 1.371.31 1.97.207.597.513 1.111.918 1.541.406.43.907.766 1.504 1.007.597.24 1.28.36 2.046.36a7.75 7.75 0 001.261-.098 4.742 4.742 0 001.106-.317v-2.822H90.33V15.51h6.459v8.203zM159.307 16.866c0 1.356-.254 2.526-.763 3.51a7.095 7.095 0 01-2.013 2.429 8.429 8.429 0 01-2.82 1.4 11.547 11.547 0 01-3.186.448h-5.84V9.166h5.663c1.106 0 2.198.127 3.274.382a8.261 8.261 0 012.876 1.27c.84.59 1.519 1.381 2.035 2.373.516.991.774 2.216.774 3.675zm-3.937 0c0-.875-.144-1.6-.432-2.177a3.674 3.674 0 00-1.15-1.378 4.626 4.626 0 00-1.637-.733 8.13 8.13 0 00-1.891-.219h-1.88v9.057h1.791a8.22 8.22 0 001.958-.23 4.651 4.651 0 001.659-.755c.48-.35.863-.816 1.15-1.4.288-.583.432-1.305.432-2.165zM80.487 16.866c0 1.356-.255 2.526-.763 3.51a7.095 7.095 0 01-2.013 2.429 8.429 8.429 0 01-2.82 1.4 11.547 11.547 0 01-3.186.448h-5.84V9.166h5.663c1.106 0 2.197.127 3.274.382a8.261 8.261 0 012.875 1.27c.841.59 1.52 1.381 2.035 2.373.517.991.775 2.216.775 3.675zm-3.938 0c0-.875-.143-1.6-.431-2.177a3.674 3.674 0 00-1.15-1.378 4.626 4.626 0 00-1.637-.733 8.13 8.13 0 00-1.891-.219h-1.88v9.057h1.791a8.22 8.22 0 001.958-.23 4.651 4.651 0 001.659-.755c.479-.35.862-.816 1.15-1.4.288-.583.431-1.305.431-2.165zM60.468 24.653l-1.216-3.04H53.19l-1.15 3.04h-4.115l6.57-15.487h3.672l6.503 15.487h-4.203zM56.265 13.3l-1.99 5.316h3.937L56.265 13.3zM139.252 24.653l-3.385-6.147h-1.283v6.147h-3.716V9.166h5.973c.752 0 1.485.076 2.2.23a5.757 5.757 0 011.925.776 4.08 4.08 0 011.36 1.444c.34.598.509 1.341.509 2.23 0 1.05-.288 1.933-.863 2.648-.575.714-1.371 1.225-2.389 1.531l4.093 6.628h-4.424zm-.155-10.74c0-.365-.078-.66-.232-.886a1.586 1.586 0 00-.598-.525 2.615 2.615 0 00-.818-.252 6.102 6.102 0 00-.874-.066h-2.013v3.61h1.792c.31 0 .627-.026.951-.077.324-.05.62-.142.885-.273.265-.132.483-.321.652-.569.17-.248.255-.569.255-.963z" />
                    <path fill="#68BC71" d="M17.154 0C11.792 0 5.324 1.252 0 4.007c0 5.95-.073 20.776 17.154 30.905C34.382 24.784 34.31 9.959 34.31 4.008 28.984 1.252 22.517 0 17.154 0z" />
                    <path fill="#67B279" d="M17.137 34.902C-.073 24.772 0 9.956 0 4.007 5.319 1.255 11.778.003 17.137 0v34.902z" />
                    <path fill="#FFF" d="M16.529 23.295l10.373-13.88c-.76-.605-1.427-.179-1.794.152l-.013.001-8.65 8.933-3.259-3.894c-1.554-1.783-3.668-.423-4.162-.063l7.505 8.75" />
                </g>
            </symbol>

            <symbol id="block-ad" viewBox="0 0 17 17">
                <g fill="#DF3812" fillRule="nonzero">
                    <path d="M14 7.186V1.445C14 .649 13.376 0 12.606 0H1.394C.629 0 0 .645 0 1.44v10.12C0 12.354.628 13 1.402 13h5.634v-.9H1.402c-.272 0-.502-.237-.502-.54V1.44c0-.302.23-.54.494-.54h11.212c.265 0 .494.238.494.545v5.741h.9zm0-5.741C14 .649 13.376 0 12.606 0H1.394C.629 0 0 .645 0 1.44v10.12C0 12.354.628 13 1.402 13h5.634v-.9H1.402c-.272 0-.502-.237-.502-.54V1.44c0-.302.23-.54.494-.54h11.212c.265 0 .494.238.494.545v5.741h.9V1.445z" />
                    <path d="M9.55 16.29V6.992l6.63 5.95-2.708-.011 1.134 2.6-2.172 1.083-1.126-2.581L9.55 16.29zm.9-7.282v4.662l1.078-1.385 1.352 3.1.56-.278-1.344-3.082 1.724.007-3.37-3.024z" />
                </g>
            </symbol>

            <symbol id="sandwich" viewBox="0 0 14 13">
                <g fill="none" fillRule="evenodd">
                    <path d="M-5-6h24v24H-5z" />
                    <path stroke="#4A90E2" strokeLinecap="square" d="M.5.5h13M.5 6.25h13M.5 12.25h13" />
                </g>
            </symbol>

            <symbol id="thumb-down" viewBox="0 0 16 18">
                <g fill="none" fillRule="evenodd">
                    <path d="M-4-4h24v24H-4z" />
                    <path fill="#F5A623" d="M14.719 7.667c.208-.742.083-1.765-.585-2.377.129-.515.126-1.161-.141-1.734a1.895 1.895 0 00-.818-.878 2.337 2.337 0 00-.342-1.147C12.441.89 11.764.445 10.803.208c-.405-.1-1.28-.126-1.28-.126h-.02c-1.623 0-3.51.646-5.464 1.892l-2.023.299a1.21 1.21 0 00-1.05 1.191v5.838c0 .49.358.723.64.91.156.103.372.237.617.393.686.434 1.834 1.161 2.222 1.532.485.463.933 1.277 1.406 2.138.305.553.62 1.126.984 1.684.464.71 1.158 1.116 1.904 1.116.637 0 1.246-.307 1.63-.822.425-.572.533-1.33.294-2.081-.264-.83-.602-1.798-1.106-2.69-.006-.01-.011-.02 0-.04.013-.022.025-.023.037-.023h3.635c.889 0 1.592-.491 1.882-1.316.289-.82.113-1.808-.392-2.436zm-1.49 2.874H9.594c-.711 0-1.161.755-.814 1.368.425.753.736 1.588 1.034 2.525.322 1.011-.325 1.763-1.075 1.763-.4 0-.827-.213-1.154-.714-.94-1.44-1.603-3.095-2.525-3.976-.728-.696-3.203-2.117-3.203-2.205V3.464a.34.34 0 01.294-.33l2.139-.322a.349.349 0 00.135-.05C6.352 1.513 8.086.935 9.502.935c.382 0 .74.042 1.074.124 1.658.408 1.763 1.413 1.696 1.934a.335.335 0 00.253.366c.886.233.927 1.421.646 1.998-.079.16-.003.35.156.434.662.35.71 1.375.45 1.856a.321.321 0 00.087.406c.725.563.764 2.487-.635 2.487z" />
                </g>
            </symbol>

            <symbol id="shield" viewBox="0 0 14 15">
                <g fill="none" fillRule="evenodd">
                    <path d="M-5-5h24v24H-5z" />
                    <path fill="#67B279" d="M7 15a.477.477 0 01-.145-.023c-1.583-.504-2.93-1.47-4.005-2.873C2.004 11 1.326 9.625.836 8.019.01 5.309 0 2.896 0 2.794c0-.243.186-.446.43-.47.036-.003 3.722-.38 6.291-2.234a.477.477 0 01.558 0c2.568 1.855 6.255 2.23 6.292 2.234a.473.473 0 01.429.47c0 .102-.01 2.515-.836 5.225-.49 1.606-1.168 2.98-2.014 4.085-1.075 1.403-2.422 2.37-4.005 2.874A.478.478 0 017 15zM.963 3.208c.04.792.193 2.616.788 4.558C2.767 11.081 4.533 13.187 7 14.031c2.473-.846 4.24-2.96 5.255-6.286a19.5 19.5 0 00.782-4.537C11.974 3.054 9.22 2.532 7 1.048 4.78 2.532 2.027 3.054.963 3.208z" />
                </g>
            </symbol>

            <symbol id="apple" viewBox="0 0 418 512">
                <path fill="#888" d="M348.748 272.046c-.646-64.841 52.88-95.938 55.271-97.483-30.075-44.01-76.925-50.039-93.62-50.736-39.871-4.037-77.798 23.474-98.033 23.474-20.184 0-51.409-22.877-84.476-22.276-43.458.646-83.529 25.269-105.906 64.19-45.152 78.35-11.563 194.42 32.445 257.963 21.504 31.104 47.146 66.038 80.813 64.79 32.421-1.294 44.681-20.979 83.878-20.979 39.196 0 50.215 20.979 84.524 20.335 34.888-.648 56.991-31.699 78.347-62.898 24.694-36.084 34.862-71.019 35.462-72.812-.775-.354-68.031-26.119-68.705-103.568zM284.28 81.761C302.149 60.082 314.21 30.005 310.92 0c-25.739 1.048-56.938 17.145-75.405 38.775-16.57 19.188-31.075 49.813-27.188 79.218 28.734 2.242 58.065-14.602 75.953-36.232z" />
            </symbol>

            <symbol id="android" viewBox="0 0 17 19">
                <path fill="#888" fillRule="evenodd" d="M3.873 6.174a.386.386 0 00-.39.382v7.956c0 .211.175.382.39.382h1.729v2.681c0 .622.515 1.127 1.15 1.127a1.14 1.14 0 001.152-1.127v-2.681h1.61v2.681c0 .622.515 1.127 1.151 1.127s1.151-.505 1.151-1.127v-2.681h1.753c.215 0 .39-.171.39-.382V6.556a.386.386 0 00-.39-.382H3.873zm-2.032-.002c-.635 0-1.15.505-1.15 1.127v4.575c0 .622.515 1.126 1.15 1.126.636 0 1.151-.504 1.151-1.126V7.299c0-.622-.515-1.127-1.15-1.127zm13.76 0a1.14 1.14 0 00-1.152 1.127v4.575A1.14 1.14 0 0015.601 13c.635 0 1.15-.504 1.15-1.126V7.299c0-.622-.515-1.127-1.15-1.127zM3.95 5.616h9.516a.385.385 0 00.383-.461 5.157 5.157 0 00-2.566-3.42L12.097.3a.2.2 0 00-.08-.274.208.208 0 00-.28.079l-.82 1.447a5.329 5.329 0 00-2.208-.475c-.788 0-1.537.17-2.208.475L5.681.104a.208.208 0 00-.28-.079.2.2 0 00-.08.274l.814 1.436a5.157 5.157 0 00-2.566 3.42.385.385 0 00.383.461zm7.598-2.14a.438.438 0 01-.443.433.438.438 0 01-.442-.433c0-.24.198-.433.442-.433.245 0 .443.194.443.433zm-5.236-.433c.244 0 .442.194.442.433s-.198.433-.442.433a.438.438 0 01-.443-.433c0-.24.198-.433.443-.433z" />
            </symbol>

            <symbol id="cross" viewBox="0 0 15.642 15.642">
                <path d="m8.882 7.821 6.541-6.541c.293-.293.293-.768 0-1.061s-.768-.293-1.061 0l-6.541 6.541-6.541-6.54c-.293-.293-.768-.293-1.061 0s-.293.768 0 1.061l6.541 6.541-6.54 6.54c-.293.293-.293.768 0 1.061.147.146.338.22.53.22s.384-.073.53-.22l6.541-6.541 6.541 6.541c.147.146.338.22.53.22s.384-.073.53-.22c.293-.293.293-.768 0-1.061z" fill="#fff" fillRule="evenodd" />
            </symbol>

            <symbol id="play" viewBox="0 0 221 246">
                <path d="m206.778 98.852-164.526-94.99c-8.731-5.041-19.155-5.039-27.886-.001-8.731 5.04-13.944 14.069-13.944 24.15v189.98c0 10.081 5.212 19.109 13.944 24.15 4.365 2.521 9.152 3.78 13.941 3.78 4.79 0 9.579-1.262 13.944-3.781l164.528-94.989c8.73-5.042 13.941-14.07 13.941-24.151 0-10.08-5.212-19.108-13.942-24.148zm-13.326 25.222-164.527 94.989c-.201.117-.62.358-1.236 0-.618-.357-.618-.839-.618-1.071v-189.98c0-.232 0-.714.618-1.071.242-.14.453-.188.633-.188.28 0 .482.117.605.188l164.526 94.99c.201.116.618.357.618 1.071s-.419.956-.619 1.072z" fill="#fff"/>
            </symbol>

            <symbol id="checkmark" viewBox="0 0 21 17">
                <defs>
                    <path id="a" d="m23.932539 33.4584991 11.4841277-15.411702c-.8415336-.6716253-1.5796787-.1976061-1.9860192.1693766l-.014827.0011762-9.5754495 9.9183328-3.6077745-4.323024c-1.7211365-1.979981-4.0610004-.4697064-4.6075965-.0705736z" />
                    <filter id="b" height="112.7%" width="110.1%" x="-5.1%" y="-6.3%">
                        <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation=".5" />
                        <feOffset dx="0" dy="1" in="shadowBlurInner1" result="shadowOffsetInner1" />
                        <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1" />
                        <feColorMatrix in="shadowInnerInner1" type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.0503566576 0" />
                    </filter>
                </defs>
                <g fill="none" fillRule="evenodd" transform="translate(-15 -17)">
                    <use fill="#fff" fillRule="evenodd" xlinkHref="#a" />
                    <use fill="#000" filter="url(#b)" xlinkHref="#a" />
                </g>
            </symbol>
        </svg>
    );
};
