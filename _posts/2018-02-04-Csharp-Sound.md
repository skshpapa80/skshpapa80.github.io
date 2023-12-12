---
layout: post
title: "[C#] 윈도우 사운드 볼륨 조절"
description: "Csharp"
comments: true
tags:
    - Programming
---

### 윈도우 사운드 볼륨 조절

프로그램에서 윈도우의 사운드 볼륨값을 지정하는 방법을 소개합니다.

알람을 발생하면서 소리를 내야 하는데

자꾸 볼륨이 줄어들어서 소리가 작게 들려서 강제로 볼륨을 지정할때 사용합니다.

<pre>
<code>
using System.Media; // 맨위에 추가

[DllImport("winmm.dll")]
public static extern int waveOutSetVolume(IntPtr hwo, uint dwVolume);

public static void SetSoundVolume(int volume)
{
	try
	{
		int newVolume = ((ushort.MaxValue / 10) * volume);
		uint newVolumeAllChannels = (((uint)newVolume &amp; 0x0000ffff) | ((uint)newVolume &lt;&lt; 16));
        waveOutSetVolume(IntPtr.Zero, newVolumeAllChannels);
	}
	catch (Exception) { }
}

</code>
</pre>

사용법
SetSoundVolume(100); // 최고 <br />
SetSoundVolume(0); // 최소
