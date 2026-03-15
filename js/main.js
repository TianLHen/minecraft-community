/*
 * Minecraft 社区网站 - JavaScript 文件
 * 这个文件让网页可以动起来，实现交互功能
 * 就像给网页添加了大脑一样！
 * 
 * @fileoverview 主 JavaScript 文件，处理所有页面交互逻辑
 * @version 1.0.0
 * @author 学习者
 */

/**
 * HTML 转义函数 - 防止 XSS 攻击
 * 将特殊字符转换为 HTML 实体，避免恶意脚本注入
 * @param {string} str - 需要转义的字符串
 * @returns {string} - 转义后的字符串
 * @example
 * escapeHTML('<script>alert("xss")</script>') 
 * // 返回："&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
 */
function escapeHTML(str) {
    if (typeof str !== 'string') {
        return str;
    }
    return str.replace(/[&<>"']/g, function(tag) {
        const chars = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return chars[tag];
    });
}

// 这是一些示例帖子数据，就像预先准备好的模板
// const 表示这是一个常量，不会改变的数据
const samplePosts = {
    // 服务器分类的帖子
    server: [
        {
            id: 1,
            // id 是每个帖子的唯一编号，就像身份证号
            title: '创造者服务器',
            // title 是帖子的标题
            ip: 'play.creator.com',
            // ip 是服务器的地址，输入这个就可以连接到服务器
            version: '1.20.4',
            // version 是服务器的游戏版本
            description: '一个专注于创造模式的服务器，提供大型建筑区域和免费素材。适合建筑爱好者展示作品。'
            // description 是帖子的详细介绍
        },
        {
            id: 2,
            title: '生存王国',
            ip: 'survival.kingdom.net',
            version: '1.20.2',
            description: '硬核生存服务器，有经济系统和领地保护。加入我们的王国，一起冒险！'
        }
    ],
    // 红石分类的帖子
    redstone: [
        {
            id: 3,
            title: '全自动农场教程',
            description: '教你如何建造一个全自动的农作物农场，每小时可产出大量食物。'
        },
        {
            id: 4,
            title: '红石电梯设计',
            description: '高效的红石电梯设计，快速上下移动，节省空间。'
        }
    ],
    // 建筑分类的帖子
    building: [
        {
            id: 5,
            title: '中世纪城堡建造指南',
            description: '详细讲解如何建造一座宏伟的中世纪风格城堡，包含城墙、塔楼和内庭。'
        },
        {
            id: 6,
            title: '现代别墅设计',
            description: '简约现代风格的别墅设计教程，适合生存模式建造。'
        }
    ],
    // 生存分类的帖子
    survival: [
        {
            id: 7,
            title: '第一天生存攻略',
            description: '新手必看！教你如何在第一个游戏日内存活并建立基础营地。'
        },
        {
            id: 8,
            title: '末地探险指南',
            description: '完整的末地探险攻略，包括寻找要塞、击败末影龙和获取鞘翅。'
        }
    ],
    // 问答分类的帖子
    qa: [
        {
            id: 9,
            title: '如何找到钻石矿？',
            description: '我在地下挖了很久都没有找到钻石，请问钻石一般在什么层数生成？有什么技巧吗？',
            category: 'newbie',
            answers: 3,
            views: 156
        },
        {
            id: 10,
            title: '红石比较器怎么用？',
            description: '看了很多教程还是不太理解红石比较器的工作原理，谁能详细解释一下？',
            category: 'redstone',
            answers: 5,
            views: 289
        },
        {
            id: 11,
            title: '求推荐生存服务器',
            description: '想找一个人多、不卡、有经济系统的生存服务器，有推荐的吗？',
            category: 'survival',
            answers: 8,
            views: 421
        },
        {
            id: 12,
            title: '建筑配色技巧',
            description: '请问大家建筑时都是怎么配色的？我总是搭不出好看的建筑。',
            category: 'building',
            answers: 6,
            views: 334
        }
    ],
    // 版本资讯分类的帖子
    versionNews: [
        {
            id: 13,
            title: 'Minecraft 1.21 更新内容汇总',
            description: '1.21 版本带来了新的试炼密室、铜傀儡、自动合成等大量新特性，一起来看看吧！',
            version: '1.21',
            date: '2026-01-15'
        },
        {
            id: 14,
            title: '快照版 26w03a 发布',
            description: '最新的快照版发布，修复了多个 Bug 并优化了游戏性能。',
            version: '26w03a',
            date: '2026-01-10'
        }
    ]
};

/**
 * Minecraft 版本库数据
 * 包含各主要版本的信息
 */
const minecraftVersions = [
    {
        version: '1.21',
        name: 'Tricky Trials',
        type: 'release',
        releaseDate: '2024-06-13',
        features: ['试炼密室', '铜傀儡', '自动合成', '旋风人'],
        description: '1.21 版本带来了新的试炼密室结构、强大的铜傀儡、自动合成台和新的敌对生物旋风人。'
    },
    {
        version: '1.20',
        name: 'Trails & Tales',
        type: 'release',
        releaseDate: '2023-06-07',
        features: ['考古系统', '樱花树林', '骆驼', '盔甲纹饰'],
        description: '1.20 版本添加了考古学系统、美丽的樱花树林生物群系、可爱的骆驼以及自定义盔甲纹饰。'
    },
    {
        version: '1.19',
        name: 'The Wild Update',
        type: 'release',
        releaseDate: '2022-06-07',
        features: ['深暗之域', '监守者', '红树林沼泽', '青蛙'],
        description: '1.19 版本更新了洞穴系统，添加了神秘的深暗之域、强大的监守者、红树林沼泽和可爱的青蛙。'
    },
    {
        version: '1.18',
        name: 'Caves & Cliffs Part II',
        type: 'release',
        releaseDate: '2021-11-30',
        features: ['全新洞穴生成', '新山脉', '更高世界限制'],
        description: '1.18 版本彻底重做了洞穴和山脉的生成机制，世界高度和深度都得到了扩展。'
    },
    {
        version: '1.17',
        name: 'Caves & Cliffs Part I',
        type: 'release',
        releaseDate: '2021-06-08',
        features: ['美西螈', '发光浆果', '铜矿石', '望远镜'],
        description: '1.17 版本添加了可爱的美西螈、发光浆果丛、新的铜矿石和望远镜等新物品。'
    },
    {
        version: '1.16',
        name: 'Nether Update',
        type: 'release',
        releaseDate: '2020-06-23',
        features: ['下界生物群系', '猪灵', '循声守卫', '新下界矿石'],
        description: '1.16 版本彻底更新了下界维度，添加了 4 个新的生物群系、猪灵生物和多种新矿石。'
    },
    {
        version: '1.14',
        name: 'Village & Pillage',
        type: 'release',
        releaseDate: '2019-04-23',
        features: ['村庄重建', '掠夺者', '熊猫', '弩'],
        description: '1.14 版本重做了村庄系统，添加了掠夺者事件、可爱的熊猫和新的武器弩。'
    },
    {
        version: '1.12',
        name: 'World of Color Update',
        type: 'release',
        releaseDate: '2017-06-07',
        features: ['混凝土', '彩色陶瓦', '鹦鹉', '幻术师'],
        description: '1.12 版本为游戏带来了大量彩色方块，是建筑爱好者的福音。'
    },
    {
        version: '1.11',
        name: 'Exploration Update',
        type: 'release',
        releaseDate: '2016-11-14',
        features: ['林地府邸', '唤魔者', '羊驼', '不死图腾'],
        description: '1.11 版本添加了神秘的林地府邸、强大的唤魔者和实用的不死图腾。'
    },
    {
        version: '1.9',
        name: 'The Combat Update',
        type: 'release',
        releaseDate: '2016-02-29',
        features: ['战斗系统重做', '末地城', '潜影贝', '鞘翅'],
        description: '1.9 版本重做了战斗系统，添加了末地城、潜影贝和可以飞行的鞘翅。'
    },
    {
        version: '1.8',
        name: 'The Bountiful Update',
        type: 'release',
        releaseDate: '2014-09-02',
        features: ['海底神殿', '兔子', '史莱姆块', '屏障'],
        description: '1.8 版本添加了海底神殿、可爱的兔子和有趣的史莱姆块。'
    },
    {
        version: '1.7',
        name: 'The Update that Changed the World',
        type: 'release',
        releaseDate: '2013-10-22',
        features: ['新生物群系', '自定义世界生成', '钓鱼重做'],
        description: '1.7 版本大幅更新了生物群系系统，改变了世界生成方式。'
    },
    {
        version: '1.0',
        name: 'Official Release',
        type: 'release',
        releaseDate: '2011-11-18',
        features: ['末地', '末影龙', '附魔', '酿造'],
        description: 'Minecraft 1.0 正式版本发布，添加了末地维度、末影龙、附魔和酿造系统。'
    }
];

/**
 * 加载帖子数据
 * 从 localStorage 读取，如果没有则返回示例数据
 * @returns {Object} 帖子数据对象
 * @throws {Error} 当 localStorage 读取失败时返回示例数据并记录错误
 */
function loadPosts() {
    try {
        // 尝试从浏览器的本地存储中读取帖子数据
        const storedPosts = localStorage.getItem('minecraft_posts');
        
        // 如果取到了数据，解析并返回
        if (storedPosts) {
            return JSON.parse(storedPosts);
        }
        
        // 如果没有保存的数据，返回示例数据
        return samplePosts;
    } catch (error) {
        // 错误处理：记录错误并返回示例数据
        console.error('加载帖子数据失败:', error);
        return samplePosts;
    }
}

/**
 * 保存帖子数据到浏览器
 * @param {Object} posts - 要保存的帖子数据对象
 * @throws {Error} 当保存失败时记录错误
 */
function savePosts(posts) {
    try {
        localStorage.setItem('minecraft_posts', JSON.stringify(posts));
    } catch (error) {
        console.error('保存帖子数据失败:', error);
        alert('保存失败，请检查浏览器存储空间是否充足');
    }
}

/**
 * 创建一个帖子卡片
 * 使用安全的文本渲染方式防止 XSS 攻击
 * @param {Object} post - 帖子数据对象
 * @param {string} category - 分类名称
 * @returns {HTMLDivElement} 创建的卡片元素
 */
function renderPostCard(post, category) {
    // 创建 div 元素作为卡片容器
    const card = document.createElement('div');
    card.className = 'post-card';
    
    // 安全地创建标题和描述（使用 textContent 而非 innerHTML）
    const title = document.createElement('h3');
    title.textContent = post.title; // 使用 textContent 自动转义，防止 XSS
    
    const description = document.createElement('p');
    const maxLength = 60;
    const descText = post.description.length > maxLength 
        ? post.description.substring(0, maxLength) + '...' 
        : post.description;
    description.textContent = descText; // 使用 textContent 自动转义
    
    card.appendChild(title);
    card.appendChild(description);
    
    // 添加点击事件监听器
    card.addEventListener('click', () => {
        try {
            if (category === 'server') {
                localStorage.setItem('current_server', JSON.stringify(post));
                window.location.href = 'server.html';
            } else {
                alert('详情页功能开发中...\n\n标题：' + escapeHTML(post.title) + '\n\n内容：' + escapeHTML(post.description));
            }
        } catch (error) {
            console.error('卡片点击事件处理失败:', error);
        }
    });
    
    return card;
}

/**
 * 初始化首页
 * 加载所有帖子数据并渲染到对应的分类区域
 */
function initHomePage() {
    try {
        const posts = loadPosts();
        // 更新：添加问答和版本资讯分类
        const categories = ['server', 'redstone', 'building', 'survival', 'qa', 'versionNews'];
        const categoryNames = {
            server: 'server-posts',
            redstone: 'redstone-posts',
            building: 'building-posts',
            survival: 'survival-posts',
            qa: 'qa-posts',
            versionNews: 'version-news'
        };
        
        categories.forEach(category => {
            try {
                const container = document.getElementById(categoryNames[category]);
                
                if (container && posts[category] && Array.isArray(posts[category])) {
                    posts[category].forEach(post => {
                        try {
                            container.appendChild(renderPostCard(post, category));
                        } catch (error) {
                            console.error(`渲染帖子 ${post.id} 失败:`, error);
                        }
                    });
                }
            } catch (error) {
                console.error(`初始化分类 ${category} 失败:`, error);
            }
        });
    } catch (error) {
        console.error('初始化首页失败:', error);
    }
}

/**
 * 初始化服务器详情页
 * 从 localStorage 读取服务器数据并显示
 */
function initServerDetailPage() {
    try {
        const serverData = localStorage.getItem('current_server');
        
        if (serverData) {
            const server = JSON.parse(serverData);
            
            // 安全地设置文本内容（textContent 自动转义）
            const nameEl = document.getElementById('server-name');
            const ipEl = document.getElementById('server-ip');
            const versionEl = document.getElementById('server-version');
            const descEl = document.getElementById('server-description');
            
            if (nameEl) nameEl.textContent = server.title || '未知服务器';
            if (ipEl) ipEl.textContent = server.ip || '未提供';
            if (versionEl) versionEl.textContent = server.version || '未提供';
            if (descEl) descEl.textContent = server.description || '暂无简介';
        } else {
            // 没有数据时显示提示
            const nameEl = document.getElementById('server-name');
            if (nameEl) {
                nameEl.textContent = '未找到服务器信息';
                const ipEl = document.getElementById('server-ip');
                const versionEl = document.getElementById('server-version');
                const descEl = document.getElementById('server-description');
                if (ipEl) ipEl.textContent = '-';
                if (versionEl) versionEl.textContent = '-';
                if (descEl) descEl.textContent = '请从首页选择一个服务器帖子查看详情。';
            }
        }
    } catch (error) {
        console.error('初始化服务器详情页失败:', error);
        const nameEl = document.getElementById('server-name');
        if (nameEl) nameEl.textContent = '加载失败，请刷新页面重试';
    }
}

/**
 * 初始化提交页面
 * 处理表单交互和帖子提交逻辑
 */
function initSubmitPage() {
    try {
        const categorySelect = document.getElementById('category');
        const serverFields = document.getElementById('server-fields');
        const form = document.getElementById('submit-form');
        
        if (!categorySelect || !serverFields || !form) {
            console.error('提交页面元素未找到');
            return;
        }
        
        // 监听分类选择框的变化
        categorySelect.addEventListener('change', function() {
            try {
                if (this.value === 'server') {
                    serverFields.style.display = 'block';
                } else {
                    serverFields.style.display = 'none';
                }
            } catch (error) {
                console.error('切换分类字段显示失败:', error);
            }
        });
        
        // 监听表单的提交事件
        form.addEventListener('submit', function(e) {
            try {
                e.preventDefault();
                
                // 获取并验证用户输入
                const category = document.getElementById('category').value;
                const title = document.getElementById('title').value.trim();
                const description = document.getElementById('description').value.trim();
                
                // 验证必填项
                if (!category || !title || !description) {
                    alert('请填写所有必填项！');
                    return;
                }
                
                // 验证输入长度
                if (title.length > 100) {
                    alert('标题不能超过 100 个字符！');
                    return;
                }
                
                if (description.length > 1000) {
                    alert('简介不能超过 1000 个字符！');
                    return;
                }
                
                // 获取所有帖子数据
                const posts = loadPosts();
                
                // 创建新的帖子对象（使用转义后的数据）
                const newPost = {
                    id: Date.now(),
                    title: escapeHTML(title),      // XSS 防护
                    description: escapeHTML(description)  // XSS 防护
                };
                
                // 如果是服务器分类，添加额外字段
                if (category === 'server') {
                    const serverIp = document.getElementById('server-ip').value.trim();
                    const serverVersion = document.getElementById('server-version').value.trim();
                    newPost.ip = serverIp ? escapeHTML(serverIp) : '未提供';
                    newPost.version = serverVersion ? escapeHTML(serverVersion) : '未提供';
                }
                
                // 初始化分类数组（如果不存在）
                if (!posts[category]) {
                    posts[category] = [];
                }
                
                // 添加新帖子
                posts[category].push(newPost);
                
                // 保存数据
                savePosts(posts);
                
                // 提示成功并跳转
                alert('帖子发布成功！');
                window.location.href = 'index.html';
                
            } catch (error) {
                console.error('表单提交处理失败:', error);
                alert('发布失败，请稍后重试');
            }
        });
    } catch (error) {
        console.error('初始化提交页面失败:', error);
    }
}

/**
 * 创建版本卡片
 * @param {Object} version - 版本数据对象
 * @returns {HTMLDivElement} 创建的卡片元素
 */
function renderVersionCard(version) {
    const card = document.createElement('div');
    card.className = 'version-card';
    card.setAttribute('data-version-type', version.type);
    
    const title = document.createElement('h3');
    title.textContent = `${version.version} - ${version.name}`;
    
    const date = document.createElement('div');
    date.className = 'version-date';
    date.textContent = `发布日期：${version.releaseDate}`;
    
    const desc = document.createElement('p');
    desc.textContent = version.description;
    
    const features = document.createElement('ul');
    features.className = 'version-features';
    version.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        features.appendChild(li);
    });
    
    const type = document.createElement('span');
    type.className = `version-type ${version.type}`;
    type.textContent = version.type === 'release' ? '正式版' : 
                       version.type === 'snapshot' ? '快照版' : '经典版';
    
    card.appendChild(type);
    card.appendChild(title);
    card.appendChild(date);
    card.appendChild(desc);
    card.appendChild(features);
    
    card.addEventListener('click', () => {
        showVersionModal(version);
    });
    
    return card;
}

/**
 * 显示版本详情弹窗
 * @param {Object} version - 版本数据对象
 */
function showVersionModal(version) {
    try {
        const modal = document.getElementById('version-modal');
        const modalTitle = document.getElementById('modal-version-title');
        const modalContent = document.getElementById('modal-version-content');
        
        if (!modal || !modalTitle || !modalContent) return;
        
        // 安全地设置文本内容（使用 textContent 而非 innerHTML）
        modalTitle.textContent = `${version.version} - ${version.name}`;
        modalContent.innerHTML = ''; // 清空内容
        
        // 创建版本类型段落
        const typePara = document.createElement('p');
        const typeLabel = document.createElement('strong');
        typeLabel.textContent = '版本类型：';
        const typeValue = document.createTextNode(
            version.type === 'release' ? '正式版' : 
            version.type === 'snapshot' ? '快照版' : '经典版'
        );
        typePara.appendChild(typeLabel);
        typePara.appendChild(typeValue);
        modalContent.appendChild(typePara);
        
        // 创建发布日期段落
        const datePara = document.createElement('p');
        const dateLabel = document.createElement('strong');
        dateLabel.textContent = '发布日期：';
        const dateValue = document.createTextNode(version.releaseDate);
        datePara.appendChild(dateLabel);
        datePara.appendChild(dateValue);
        modalContent.appendChild(datePara);
        
        // 创建版本介绍段落
        const descPara = document.createElement('p');
        const descLabel = document.createElement('strong');
        descLabel.textContent = '版本介绍：';
        const descValue = document.createTextNode(version.description);
        descPara.appendChild(descLabel);
        descPara.appendChild(descValue);
        modalContent.appendChild(descPara);
        
        // 创建主要特性标题
        const featuresTitle = document.createElement('h4');
        featuresTitle.textContent = '主要特性：';
        modalContent.appendChild(featuresTitle);
        
        // 创建特性列表
        const featuresList = document.createElement('ul');
        version.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature; // 使用 textContent 防止 XSS
            featuresList.appendChild(li);
        });
        modalContent.appendChild(featuresList);
        
        modal.style.display = 'block';
        
        // 关闭按钮事件
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.onclick = () => {
                modal.style.display = 'none';
            };
            closeBtn.onkeypress = (e) => {
                if (e.key === 'Enter') {
                    modal.style.display = 'none';
                }
            };
        }
        
        // 点击弹窗外部关闭
        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    } catch (error) {
        console.error('显示版本详情失败:', error);
    }
}

/**
 * 初始化版本库页面
 */
function initVersionsPage() {
    try {
        const versionList = document.getElementById('version-list');
        if (!versionList) return;
        
        versionList.innerHTML = '';
        
        minecraftVersions.forEach(version => {
            try {
                versionList.appendChild(renderVersionCard(version));
            } catch (error) {
                console.error(`渲染版本 ${version.version} 失败:`, error);
            }
        });
        
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                const cards = document.querySelectorAll('.version-card');
                
                cards.forEach(card => {
                    const type = card.getAttribute('data-version-type');
                    if (filter === 'all' || 
                        (filter === 'latest' && ['1.21', '1.20', '1.19'].includes(card.querySelector('h3').textContent.split(' - ')[0])) ||
                        (filter === 'release' && type === 'release') ||
                        (filter === 'snapshot' && type === 'snapshot') ||
                        (filter === 'legacy' && ['1.0', '1.7', '1.8', '1.9', '1.11', '1.12'].some(v => card.querySelector('h3').textContent.includes(v)))) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    } catch (error) {
        console.error('初始化版本库页面失败:', error);
    }
}

/**
 * 创建问答卡片
 * @param {Object} qa - 问答数据对象
 * @returns {HTMLDivElement} 创建的卡片元素
 */
function renderQACard(qa) {
    const card = document.createElement('div');
    card.className = 'qa-card';
    card.setAttribute('data-category', qa.category || 'all');
    
    const title = document.createElement('h3');
    title.textContent = qa.title;
    
    const desc = document.createElement('p');
    desc.textContent = qa.description;
    
    // 安全地创建元数据区域（使用 textContent 而非 innerHTML）
    const meta = document.createElement('div');
    meta.className = 'qa-meta';
    
    const viewsSpan = document.createElement('span');
    viewsSpan.textContent = `👁 ${qa.views || 0} 次浏览`;
    
    const answersSpan = document.createElement('span');
    answersSpan.textContent = `💬 ${qa.answers || 0} 条回答`;
    
    meta.appendChild(viewsSpan);
    meta.appendChild(answersSpan);
    
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(meta);
    
    card.addEventListener('click', () => {
        alert('问答详情功能开发中...\n\n标题：' + escapeHTML(qa.title) + '\n\n内容：' + escapeHTML(qa.description));
    });
    
    return card;
}

/**
 * 初始化问答页面
 */
function initQAPage() {
    try {
        const qaList = document.getElementById('qa-list');
        if (!qaList) return;
        
        qaList.innerHTML = '';
        
        const posts = loadPosts();
        const qaPosts = posts.qa || [];
        
        qaPosts.forEach(qa => {
            try {
                qaList.appendChild(renderQACard(qa));
            } catch (error) {
                console.error(`渲染问答 ${qa.id} 失败:`, error);
            }
        });
        
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                const cards = document.querySelectorAll('.qa-card');
                
                cards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        
        const askBtn = document.getElementById('ask-question-btn');
        if (askBtn) {
            askBtn.addEventListener('click', () => {
                window.location.href = 'submit.html';
            });
        }
    } catch (error) {
        console.error('初始化问答页面失败:', error);
    }
}

/**
 * ========== 性能优化：虚拟滚动 ==========
 * 当帖子数量很多时，只渲染可见区域的帖子，大幅提升性能
 */

/**
 * 虚拟滚动配置
 */
const VIRTUAL_SCROLL_CONFIG = {
    ITEM_HEIGHT: 200, // 每个帖子的估计高度（像素）
    BUFFER_SIZE: 5,   // 缓冲区大小（额外渲染的帖子数）
    ENABLED: true     // 是否启用虚拟滚动
};

/**
 * 虚拟滚动状态
 */
let virtualScrollState = {
    container: null,          // 滚动容器
    posts: [],                // 所有帖子数据
    visibleStart: 0,          // 可见区域起始索引
    visibleEnd: 0,            // 可见区域结束索引
    containerHeight: 0,       // 容器高度
    scrollTop: 0              // 滚动位置
};

/**
 * 初始化虚拟滚动
 * @param {string} containerId - 容器 ID
 * @param {Array} posts - 帖子数据数组
 */
function initVirtualScroll(containerId, posts) {
    if (!VIRTUAL_SCROLL_CONFIG.ENABLED) {
        return false;
    }
    
    const container = document.getElementById(containerId);
    if (!container) {
        return false;
    }
    
    virtualScrollState = {
        container: container,
        posts: posts,
        visibleStart: 0,
        visibleEnd: Math.min(
            Math.ceil(container.clientHeight / VIRTUAL_SCROLL_CONFIG.ITEM_HEIGHT),
            posts.length
        ),
        containerHeight: container.clientHeight,
        scrollTop: 0
    };
    
    // 设置容器样式
    container.style.overflowY = 'auto';
    container.style.position = 'relative';
    container.style.height = '600px'; // 固定高度
    
    // 监听滚动事件
    container.addEventListener('scroll', handleVirtualScroll);
    
    // 初次渲染
    renderVirtualScroll();
    
    return true;
}

/**
 * 处理滚动事件（带防抖）
 */
let scrollTimeout = null;
function handleVirtualScroll() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
        virtualScrollState.scrollTop = virtualScrollState.container.scrollTop;
        renderVirtualScroll();
    }, 50); // 50ms 防抖
}

/**
 * 渲染虚拟滚动内容
 */
function renderVirtualScroll() {
    const { container, posts, containerHeight, scrollTop } = virtualScrollState;
    if (!container) return;
    
    const itemHeight = VIRTUAL_SCROLL_CONFIG.ITEM_HEIGHT;
    const buffer = VIRTUAL_SCROLL_CONFIG.BUFFER_SIZE;
    
    // 计算可见区域
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const endIndex = Math.min(posts.length, startIndex + visibleCount + buffer * 2);
    
    // 如果范围没有变化，跳过渲染
    if (startIndex === virtualScrollState.visibleStart && 
        endIndex === virtualScrollState.visibleEnd) {
        return;
    }
    
    virtualScrollState.visibleStart = startIndex;
    virtualScrollState.visibleEnd = endIndex;
    
    // 清空容器
    container.innerHTML = '';
    
    // 设置占位高度
    const placeholderHeight = posts.length * itemHeight;
    container.style.minHeight = `${placeholderHeight}px`;
    
    // 创建滚动容器
    const scrollContainer = document.createElement('div');
    scrollContainer.style.position = 'absolute';
    scrollContainer.style.top = '0';
    scrollContainer.style.left = '0';
    scrollContainer.style.width = '100%';
    scrollContainer.style.transform = `translateY(${startIndex * itemHeight}px)`;
    
    // 只渲染可见区域的帖子
    for (let i = startIndex; i < endIndex; i++) {
        const post = posts[i];
        if (post) {
            const category = post._category || 'server';
            const card = renderPostCard(post, category);
            card.style.height = `${itemHeight - 20}px`; // 减去间距
            card.style.marginBottom = '20px';
            scrollContainer.appendChild(card);
        }
    }
    
    container.appendChild(scrollContainer);
}

/**
 * 禁用虚拟滚动（用于帖子数量少时）
 */
function disableVirtualScroll() {
    if (virtualScrollState.container) {
        virtualScrollState.container.style.overflowY = '';
        virtualScrollState.container.style.height = '';
        virtualScrollState.container.removeEventListener('scroll', handleVirtualScroll);
    }
}

/**
 * 初始化标签导航系统
 * 处理分类标签切换和搜索功能
 */
function initTabsAndSearch() {
    try {
        // 标签切换功能
        const tabBtns = document.querySelectorAll('.tab-btn');
        const postsContainer = document.getElementById('posts-container');
        
        if (!postsContainer) return;
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有标签的 active 类
                tabBtns.forEach(b => b.classList.remove('active'));
                // 给当前点击的标签添加 active 类
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                filterPostsByCategory(category);
            });
        });
        
        // 搜索功能
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase().trim();
                filterPostsBySearch(searchTerm);
            });
        }
        
    } catch (error) {
        console.error('初始化标签和搜索失败:', error);
    }
}

/**
 * 根据分类筛选帖子
 * @param {string} category - 分类名称
 */
function filterPostsByCategory(category) {
    try {
        const posts = loadPosts();
        const postsContainer = document.getElementById('posts-container');
        
        if (!postsContainer) return;
        
        postsContainer.innerHTML = '';
        
        let filteredPosts = [];
        
        if (category === 'all') {
            // 显示所有帖子
            Object.keys(posts).forEach(cat => {
                if (posts[cat] && Array.isArray(posts[cat])) {
                    filteredPosts = filteredPosts.concat(posts[cat].map(post => ({
                        ...post,
                        _category: cat
                    })));
                }
            });
        } else {
            // 显示指定分类的帖子
            if (posts[category] && Array.isArray(posts[category])) {
                filteredPosts = posts[category].map(post => ({
                    ...post,
                    _category: category
                }));
            }
        }
        
        // 更新统计信息
        updateStats(filteredPosts.length);
        
        // 渲染帖子
        if (filteredPosts.length === 0) {
            showEmptyState();
        } else {
            hideEmptyState();
            filteredPosts.forEach(post => {
                try {
                    postsContainer.appendChild(renderPostCard(post, post._category));
                } catch (error) {
                    console.error(`渲染帖子 ${post.id} 失败:`, error);
                }
            });
        }
        
    } catch (error) {
        console.error('筛选帖子失败:', error);
    }
}

/**
 * 根据搜索词筛选帖子
 * @param {string} searchTerm - 搜索关键词
 */
function filterPostsBySearch(searchTerm) {
    try {
        const posts = loadPosts();
        const postsContainer = document.getElementById('posts-container');
        const activeTab = document.querySelector('.tab-btn.active');
        const currentCategory = activeTab ? activeTab.getAttribute('data-category') : 'all';
        
        if (!postsContainer) return;
        
        postsContainer.innerHTML = '';
        
        let filteredPosts = [];
        
        // 获取当前分类的帖子
        if (currentCategory === 'all') {
            Object.keys(posts).forEach(cat => {
                if (posts[cat] && Array.isArray(posts[cat])) {
                    filteredPosts = filteredPosts.concat(posts[cat].map(post => ({
                        ...post,
                        _category: cat
                    })));
                }
            });
        } else {
            if (posts[currentCategory] && Array.isArray(posts[currentCategory])) {
                filteredPosts = posts[currentCategory].map(post => ({
                    ...post,
                    _category: currentCategory
                }));
            }
        }
        
        // 根据搜索词过滤
        if (searchTerm) {
            filteredPosts = filteredPosts.filter(post => {
                return (post.title && post.title.toLowerCase().includes(searchTerm)) ||
                       (post.description && post.description.toLowerCase().includes(searchTerm));
            });
        }
        
        // 更新统计信息
        updateStats(filteredPosts.length);
        
        // 渲染帖子
        if (filteredPosts.length === 0) {
            showEmptyState();
        } else {
            hideEmptyState();
            filteredPosts.forEach(post => {
                try {
                    postsContainer.appendChild(renderPostCard(post, post._category));
                } catch (error) {
                    console.error(`渲染帖子 ${post.id} 失败:`, error);
                }
            });
        }
        
    } catch (error) {
        console.error('搜索帖子失败:', error);
    }
}

/**
 * 更新统计信息
 * @param {number} count - 帖子数量
 */
function updateStats(count) {
    try {
        const totalPostsEl = document.getElementById('total-posts');
        if (totalPostsEl) {
            totalPostsEl.textContent = count;
        }
    } catch (error) {
        console.error('更新统计失败:', error);
    }
}

/**
 * 显示空状态
 */
function showEmptyState() {
    try {
        const emptyState = document.getElementById('empty-state');
        const loadMoreContainer = document.getElementById('load-more-container');
        
        if (emptyState) emptyState.style.display = 'block';
        if (loadMoreContainer) loadMoreContainer.style.display = 'none';
    } catch (error) {
        console.error('显示空状态失败:', error);
    }
}

/**
 * 隐藏空状态
 */
function hideEmptyState() {
    try {
        const emptyState = document.getElementById('empty-state');
        if (emptyState) emptyState.style.display = 'none';
    } catch (error) {
        console.error('隐藏空状态失败:', error);
    }
}

/**
 * 增强版首页初始化函数
 * 使用新的 UI 结构渲染帖子，并根据帖子数量决定是否使用虚拟滚动
 */
function initHomePageEnhanced() {
    try {
        const posts = loadPosts();
        const postsContainer = document.getElementById('posts-container');
        
        if (!postsContainer) {
            console.warn('未找到 posts-container 元素，使用旧版初始化');
            initHomePage();
            return;
        }
        
        // 收集所有帖子
        let allPosts = [];
        const categories = ['server', 'redstone', 'building', 'survival', 'qa', 'versionNews'];
        
        categories.forEach(category => {
            if (posts[category] && Array.isArray(posts[category])) {
                allPosts = allPosts.concat(posts[category].map(post => ({
                    ...post,
                    _category: category
                })));
            }
        });
        
        // 更新统计信息
        updateStats(allPosts.length);
        
        // 根据帖子数量决定是否使用虚拟滚动
        if (allPosts.length > 20) {
            // 帖子数量多，使用虚拟滚动
            console.log(`📊 帖子数量：${allPosts.length}，启用虚拟滚动优化`);
            initVirtualScroll('posts-container', allPosts);
        } else {
            // 帖子数量少，直接渲染所有
            console.log(`📊 帖子数量：${allPosts.length}，直接渲染`);
            if (allPosts.length === 0) {
                showEmptyState();
            } else {
                hideEmptyState();
                allPosts.forEach(post => {
                    try {
                        postsContainer.appendChild(renderPostCard(post, post._category));
                    } catch (error) {
                        console.error(`渲染帖子 ${post.id} 失败:`, error);
                    }
                });
            }
        }
        
        // 初始化标签和搜索功能
        initTabsAndSearch();
        
    } catch (error) {
        console.error('增强版首页初始化失败:', error);
        initHomePage();
    }
}

/**
 * ========== 错误边界：全局错误处理 ==========
 * 捕获所有未处理的错误，提供友好的用户提示
 */

/**
 * 全局错误处理器
 * @param {Error} error - 错误对象
 * @param {string} context - 错误发生的上下文
 */
function handleError(error, context = '未知错误') {
    console.error(`[${context}] 错误:`, error);
    
    // 记录错误到日志（可以发送到服务器）
    logError(error, context);
    
    // 显示友好的错误提示
    showErrorNotification(error, context);
}

/**
 * 错误日志记录
 * @param {Error} error - 错误对象
 * @param {string} context - 错误上下文
 */
function logError(error, context) {
    const errorLog = {
        timestamp: new Date().toISOString(),
        context: context,
        message: error.message,
        stack: error.stack,
        url: window.location.href,
        userAgent: navigator.userAgent
    };
    
    // 保存到 localStorage（实际应用中应该发送到服务器）
    try {
        const errorLogs = JSON.parse(localStorage.getItem('errorLogs') || '[]');
        errorLogs.push(errorLog);
        // 只保留最近 100 条错误
        if (errorLogs.length > 100) {
            errorLogs.shift();
        }
        localStorage.setItem('errorLogs', JSON.stringify(errorLogs));
    } catch (e) {
        console.error('保存错误日志失败:', e);
    }
}

/**
 * 显示错误通知
 * @param {Error} error - 错误对象
 * @param {string} context - 错误上下文
 */
function showErrorNotification(error, context) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
        <div class="error-content">
            <span class="error-icon">⚠️</span>
            <div class="error-message">
                <strong>发生错误</strong>
                <p>${getFriendlyErrorMessage(error)}</p>
                <small>${context}</small>
            </div>
            <button class="error-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // 添加样式
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'var(--bg-card)',
        border: '2px solid #ef4444',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-md)',
        maxWidth: '400px',
        zIndex: '10000',
        boxShadow: 'var(--shadow-lg)',
        animation: 'slideIn 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // 5 秒后自动消失
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/**
 * 获取友好的错误消息
 * @param {Error} error - 错误对象
 * @returns {string} 友好的错误消息
 */
function getFriendlyErrorMessage(error) {
    const message = error.message.toLowerCase();
    
    if (message.includes('network') || message.includes('fetch')) {
        return '网络连接失败，请检查您的网络连接后重试。';
    } else if (message.includes('permission') || message.includes('denied')) {
        return '权限不足，无法执行此操作。';
    } else if (message.includes('not found') || message.includes('404')) {
        return '请求的资源未找到。';
    } else if (message.includes('storage') || message.includes('quota')) {
        return '存储空间不足，请清理浏览器缓存后重试。';
    } else if (message.includes('parse') || message.includes('syntax')) {
        return '数据格式错误，请刷新页面重试。';
    } else {
        return '发生未知错误，请刷新页面或联系管理员。';
    }
}

/**
 * 包装函数，自动捕获错误
 * @param {Function} fn - 要执行的函数
 * @param {string} context - 错误上下文
 * @param {any} fallback - 错误发生时的返回值
 * @returns {Function} 包装后的函数
 */
function withErrorHandling(fn, context, fallback = null) {
    return function(...args) {
        try {
            return fn.apply(this, args);
        } catch (error) {
            handleError(error, context);
            return fallback;
        }
    };
}

/**
 * 异步函数错误处理包装器
 * @param {Function} fn - 异步函数
 * @param {string} context - 错误上下文
 * @param {any} fallback - 错误发生时的返回值
 * @returns {Function} 包装后的异步函数
 */
function withAsyncErrorHandling(fn, context, fallback = null) {
    return async function(...args) {
        try {
            return await fn.apply(this, args);
        } catch (error) {
            handleError(error, context);
            return fallback;
        }
    };
}

/**
 * 全局错误监听
 */
window.addEventListener('error', function(event) {
    event.preventDefault();
    handleError(event.error, `全局错误：${event.filename}:${event.lineno}:${event.colno}`);
});

window.addEventListener('unhandledrejection', function(event) {
    event.preventDefault();
    const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
    handleError(error, '未处理的 Promise 拒绝');
});

/**
 * 添加错误通知动画样式
 */
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .error-notification {
        animation: slideIn 0.3s ease;
    }
    
    .error-content {
        display: flex;
        align-items: flex-start;
        gap: 10px;
    }
    
    .error-icon {
        font-size: 24px;
    }
    
    .error-message {
        flex: 1;
    }
    
    .error-message strong {
        color: var(--primary-color);
        display: block;
        margin-bottom: 5px;
    }
    
    .error-message p {
        color: var(--text-primary);
        margin: 5px 0;
        font-size: 14px;
    }
    
    .error-message small {
        color: var(--text-muted);
        font-size: 12px;
    }
    
    .error-close {
        background: none;
        border: none;
        color: var(--text-muted);
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all var(--transition-fast);
    }
    
    .error-close:hover {
        background: var(--bg-card-hover);
        color: var(--primary-color);
    }
`;
document.head.appendChild(errorStyles);
    const card = document.createElement('div');
    card.className = 'post-card';
    card.setAttribute('data-category', category);
    
    // 创建标题
    const title = document.createElement('h3');
    title.textContent = post.title;
    
    // 创建描述
    const desc = document.createElement('p');
    desc.textContent = post.description;
    
    // 创建元信息区域
    const meta = document.createElement('div');
    meta.className = 'post-meta';
    
    // 分类标签
    const categoryLabel = document.createElement('span');
    categoryLabel.className = 'post-category';
    const categoryNames = {
        server: '🖥️ 服务器',
        redstone: '⚡ 红石',
        building: '🏗️ 建筑',
        survival: '🌲 生存',
        qa: '💬 问答',
        versionNews: '📰 版本资讯'
    };
    categoryLabel.textContent = categoryNames[category] || category;
    
    // 日期信息
    const dateSpan = document.createElement('span');
    dateSpan.className = 'post-date';
    dateSpan.textContent = `📅 ${post.date || new Date().toLocaleDateString('zh-CN')}`;
    
    meta.appendChild(categoryLabel);
    meta.appendChild(dateSpan);
    
    // 组装卡片
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(meta);
    
    // 点击事件
    card.addEventListener('click', () => {
        try {
            if (category === 'server') {
                localStorage.setItem('current_server', JSON.stringify(post));
                window.location.href = 'server.html';
            } else {
                alert('帖子详情：\n\n标题：' + escapeHTML(post.title) + '\n\n内容：' + escapeHTML(post.description));
            }
        } catch (error) {
            console.error('处理帖子点击失败:', error);
        }
    });
    
    return card;
}

// document.addEventListener 是监听整个文档的事件
// 'DOMContentLoaded' 是页面加载完成时触发
document.addEventListener('DOMContentLoaded', function() {
    // 获取当前页面的路径
    const path = window.location.pathname;
    
    // 判断当前是哪个页面，然后执行对应的初始化函数
    if (path.endsWith('index.html') || path.endsWith('/')) {
        // endsWith 是判断字符串是否以某个内容结尾
        // 如果是首页，就运行增强版初始化
        initHomePageEnhanced();
    } else if (path.endsWith('server.html')) {
        // 如果是服务器详情页，运行 initServerDetailPage
        initServerDetailPage();
    } else if (path.endsWith('submit.html')) {
        // 如果是提交页，运行 initSubmitPage
        initSubmitPage();
    } else if (path.endsWith('versions.html')) {
        // 如果是版本库页面，运行 initVersionsPage
        initVersionsPage();
    } else if (path.endsWith('qa.html')) {
        // 如果是问答页面，运行 initQAPage
        initQAPage();
    }
});
