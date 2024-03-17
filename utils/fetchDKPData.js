const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function fetchDKPData(dkp) {
  try {
    // Make the request to the Digikala API
    const response = await axios.get(
      `${process.env.DIGIKALA_BASE_URL}/product/${dkp}/`
    );

    // Parse the JSON response
    const data = response.data;

    if (data.status !== 200) {
      return null;
    }

    const productLastComments = data.data.product.last_comments.map(
      (comment) => ({
        id: comment.id,
        title: comment.title,
        body: comment.body,
        created_at: comment.created_at,
        rate: comment.rate,
        is_buyer: comment.is_buyer,
        is_anonymous: comment.is_anonymous,
        relative_date: comment.relative_date,
      })
    );

    const productLastQuestions = data.data.product.last_questions.map(
      (question) => ({
        id: question.id,
        text: question.text,
        answer_count: question.answer_count,
        sender: question.sender,
        created_at: question.created_at,
      })
    );

    const values = {
      product_dkp: data.data.product.id || "",
      product_title: data.data.product.title_fa || "",
      product_image_url:
        (data.data.intrack.eventData.productImageUrl &&
          data.data.intrack.eventData.productImageUrl[0]) ||
        "",
      product_url: data.data.product.url.uri || "",
      product_status: data.data.product.status || "",
      product_colors: data.data.product.colors || [],
      product_rate: data.data.product.default_variant.rate || 0,
      product_statistics: data.data.product.default_variant.statistics || {},
      product_properties: {
        is_ship_by_seller:
          data.data.product.default_variant.properties?.is_ship_by_seller ||
          false,
        is_multi_warehouse:
          data.data.product.default_variant.properties?.is_multi_warehouse ||
          false,
        in_digikala_warehouse:
          data.data.product.default_variant.properties?.in_digikala_warehouse ||
          false,
      },
      product_warranty:
        data.data.product.default_variant.warranty?.title_fa || "",
      product_color: {
        title: data.data.product.default_variant.color.title || "",
        hex_code: data.data.product.default_variant.color.hex_code || "",
      },
      product_seller: {
        id: data.data.product.default_variant.seller.id || "",
        title: data.data.product.default_variant.seller.title || "",
        code: data.data.product.default_variant.seller.code || "",
        url: data.data.product.default_variant.seller.url || "",
        rating: {
          total_rate:
            data.data.product.default_variant.seller.rating?.total_rate || 0,
          total_count:
            data.data.product.default_variant.seller.rating?.total_count || 0,
          commitment:
            data.data.product.default_variant.seller.rating?.commitment || 0,
          no_return:
            data.data.product.default_variant.seller.rating?.no_return || 0,
          on_time_shipping:
            data.data.product.default_variant.seller.rating?.on_time_shipping ||
            0,
        },
        properties: {
          is_trusted:
            data.data.product.default_variant.seller.properties?.is_trusted ||
            false,
          is_official:
            data.data.product.default_variant.seller.properties?.is_official ||
            false,
          is_new:
            data.data.product.default_variant.seller.properties?.is_new ||
            false,
        },
        stars: data.data.product.default_variant.seller.stars || 0,
        grade: data.data.product.default_variant.seller.grade?.label || "",
        registration_date:
          data.data.product.default_variant.seller.registration_date || "",
      },
      product_price: {
        selling_price:
          data.data.product.default_variant.price?.selling_price || "بدون قیمت",
        discount_percent:
          data.data.product.default_variant.price?.discount_percent || 0,
        timer: data.data.product.default_variant.price?.timer || 0,
      },
      product_videos: data.data.product.videos || [],
      product_category: data.data.product.category.title_fa || "",
      product_questions_count: data.data.product.questions_count || 0,
      product_comments_count: data.data.product.comments_count || 0,
      product_last_comments: productLastComments || [],
      product_last_questions: productLastQuestions || [],
      product_images: data.data.seo?.markup_schema[0]?.images || [],
      product_stars:
        data.data.seo.markup_schema[0]?.aggregateRating?.ratingValue || 0,
      product_stars_count:
        data.data.seo.markup_schema[0]?.aggregateRating?.reviewCount || 0,
    };

    return values;
  } catch (error) {
    console.error(error);
    return {};
  }
}

module.exports = fetchDKPData;
