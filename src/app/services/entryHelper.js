/**
 * Static service to keep Entry logic DRY
 */
class EntryHelper {

  /**
   * Function to find the correct image for our main gallery
   */
  static getEntryImageSource(entry) {
    // Get the first custom field if there is one
    if (!entry ||
      !entry.customFields ||
      entry.customFields.length <= 0) {
      return false;
    }

    // Find the first field in any filled custom field
    const field = this.getEntryField(entry);

    if (!field) {
      return field;
    }

    // Check if it contains imgur
    if (field.includes('imgur')) {
      // If not a gif, return a small thumbnail
      if (!field.includes('.gif')) {
        // Parse out the file extensions
        let smallImgur = field.split(/\.(jpg|jpeg|tiff|png)$/i);
        // Add the imgur size extension to the link
        smallImgur = smallImgur[0] + 'l.' + smallImgur[1];
        return smallImgur;
      }
      // If it is a gif, return the direct gif
      return field;
    }

    // Check if it contains youtube
    if (field.includes('youtu')) {
      // Return the small image as the background style
      // https://img.youtube.com/vi/tjYUGPZtAOA/0.jpg

      // Extract the youtube video id
      // https://stackoverflow.com/questions/3452546/javascript-regex-how-do-i-get-the-youtube-video-id-from-a-url
      const youtubeRegExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/; // eslint-disable-line
      const match = field.match(youtubeRegExp);
      const videoId = (match && match[7].length === 11) ? match[7] : false;
      return 'https://img.youtube.com/vi/' + videoId + '/0.jpg';
    }
  }

  /**
   * Function to return the embeddable source
   */
  static getEmbed(entry) {
    // Get the first custom field if there is one
    if (!entry ||
      !entry.customFields ||
      entry.customFields.length <= 0) {
      return false;
    }

    // Find the first field in any filled custom field
    const field = this.getEntryField(entry);

    if (!field) {
      return field;
    }

    // Check if it contains imgur
    if (field.includes('imgur')) {
      // Return the full image
      return field;
    }

    // Check if it contains youtube
    if (field.includes('youtu')) {
      // Return the small image as the background style
      // https://img.youtube.com/vi/tjYUGPZtAOA/0.jpg

      // Extract the youtube video id
      // https://stackoverflow.com/questions/3452546/javascript-regex-how-do-i-get-the-youtube-video-id-from-a-url
      const youtubeRegExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/; // eslint-disable-line
      const match = field.match(youtubeRegExp);
      const videoId = (match && match[7].length === 11) ? match[7] : false;
      return 'https://youtube.com/embed/' + videoId;
    }
  }

  /**
   * Function to return if an entry is a image
   */
  static isImage(entry) {
    // Find the first field in any filled custom field
    const field = this.getEntryField(entry);

    if (!field) {
      return field;
    }

    return field.includes('imgur');
  }

  /**
   * Function to return if an entry is a video
   */
  static isVideo(entry) {
    // Find the first field in any filled custom field
    const field = this.getEntryField(entry);

    if (!field) {
      return field;
    }

    return field.includes('youtu');
  }

  /**
   * Function to grab the first filed of an entry
   */
  static getEntryField(entry) {
    // Find the first field in any filled custom field
    let field = false;
    if (!entry ||
      !entry.customFields ||
      entry.customFields.length < 1) {
      return field;
    }
    entry.customFields.some(customField => {
      if (customField.fields && customField.fields[0].length > 0) {
        field = customField.fields[0];
        return true;
      }
      return false;
    });

    return field;
  }
}

export default EntryHelper;
