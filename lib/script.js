document.addEventListener('DOMContentLoaded', function () {
  const colorInput = document.getElementById('colorInput');
  const colorOutput = document.getElementById('colorOutput');
  const copyIcon = document.getElementById('copyIcon');
  const previewColor = document.getElementById('previewColor');
  const convertButton = document.getElementById('convertButton');

  copyIcon.addEventListener('click', function () {
    const convertedColor = colorOutput.value;
    if (convertedColor) {
      copyToClipboard(convertedColor);
    }
  });

  convertButton.addEventListener('click', function () {
    const colorValue = colorInput.value;
    const convertedColor = convertColor(colorValue);

    if (convertedColor) {
      colorOutput.value = convertedColor;
      previewColor.style.backgroundColor = convertedColor;
    } else {
      alert('Invalid color input.');
    }
  });

  function convertColor(color) {
    if (color.startsWith('rgba(')) {
      
      return rgbaToHex(color);
    } else if (color.startsWith('#') && (color.length === 4 || color.length === 7)) {
      return hexToRgba(color);
    }
    return null;
  }

  function copyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    // alert('Copied to clipboard: ' + text);
  }

  function rgbaToHex(rgbaColor) {
    const rgbaMatch = rgbaColor.match(/(\d+)/g);
    if (rgbaMatch && rgbaMatch.length >= 3) {
      const r = parseInt(rgbaMatch[0]);
      const g = parseInt(rgbaMatch[1]);
      const b = parseInt(rgbaMatch[2]);

      if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
        const hexValue = ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase();
        return `#${hexValue}`;
      }
    }
    return null;
  }

  function hexToRgba(hexColor) {
    const hexMatch = hexColor.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (hexMatch) {
      const r = parseInt(hexMatch[1], 16);
      const g = parseInt(hexMatch[2], 16);
      const b = parseInt(hexMatch[3], 16);

      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
        return `rgba(${r}, ${g}, ${b}, 1)`;
      }
    }
    return null;
  }
});
